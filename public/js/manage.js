const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// --- 🆕 配置区域：定义文件映射 ---
const FILE_MAP = {
    'cn': path.join(__dirname, 'webstack.yml'), // 中文数据 (通常是纯数组)
    'en': path.join(__dirname, 'en.md')         // 英文数据 (包含 type, title 等头部信息的对象)
};
// ------------------------------------

app.use(bodyParser.json({ limit: '50mb' })); // 增加大小限制防止数据过多报错
app.use(express.static(__dirname)); 

// 统计辅助函数
function countWebsites(items) {
    let count = 0;
    if (!Array.isArray(items)) return 0;
    
    function traverse(list) {
        list.forEach(item => {
            if (!item) return;
            if (item.url) count++;
            if (item.links) traverse(item.links);
            if (item.list) traverse(item.list);
        });
    }
    traverse(items);
    return count;
}

// 🆕 获取数据接口 (智能拆包)
app.get('/api/data', (req, res) => {
    try {
        const fileKey = req.query.key || 'cn';
        const filePath = FILE_MAP[fileKey];

        if (!filePath) throw new Error('无效的文件标识符');
        if (!fs.existsSync(filePath)) {
            // 如果文件不存在，如果是 en，初始化基本结构
            if (fileKey === 'en') {
                return res.json([]); // 返回空数组供前端渲染
            }
            return res.json([]);
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // 使用 loadAll 解决 "expected a single document" 错误
        // loadAll 会返回一个数组，我们取第一个文档对象
        const documents = yaml.loadAll(fileContents);
        const rawData = documents[0] || {}; 

        let listData = [];

        // 判断是纯数组还是包含 data 的对象
        if (fileKey === 'en') {
            // en.md 结构：{ title: "DawnNav", data: [ ... ] }
            // 我们只把 data 部分发给前端
            listData = rawData.data || [];
        } else {
            // webstack.yml 结构：[ ... ]
            listData = Array.isArray(rawData) ? rawData : [];
        }

        const totalSites = countWebsites(listData);
        console.log(`📖 读取 [${fileKey}]: ${totalSites} 个链接`);
        
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
        res.setHeader('X-Total-Count', totalSites);
        
        res.json(listData);

    } catch (e) {
        console.error('❌ 读取错误:', e);
        res.status(500).json({ error: e.message });
    }
});

// 🆕 保存数据接口 (智能打包)
app.post('/api/save', (req, res) => {
    try {
        const { fileKey, data } = req.body; // data 是前端传来的纯数组
        const filePath = FILE_MAP[fileKey || 'cn'];

        if (!filePath) throw new Error('无效的文件标识符');

        let yamlStr = '';

        if (fileKey === 'en') {
            // 🚨 对于 en.md，需要先读取旧文件，保留头部配置 (title, search...)
            // 然后只更新 .data 部分
            let existingContent = {};
            if (fs.existsSync(filePath)) {
                // 保存前读取旧文件时，同样使用 loadAll 防止报错
                const documents = yaml.loadAll(fs.readFileSync(filePath, 'utf8'));
                existingContent = documents[0] || {};
            } else {
                // 如果文件不存在，给个默认头
                existingContent = { type: 'nav', title: 'DawnNav', data: [] };
            }

            // 更新数据部分
            existingContent.data = data;
            
            // 转换为 YAML
            yamlStr = yaml.dump(existingContent, { lineWidth: -1, noRefs: true });

        } else {
            // 🚨 对于 webstack.yml，直接保存数组
            yamlStr = yaml.dump(data, { lineWidth: -1, noRefs: true });
        }

        fs.writeFileSync(filePath, yamlStr, 'utf8');
        
        const totalSites = countWebsites(data);
        console.log(`💾 保存 [${fileKey}] 成功 (当前共 ${totalSites} 个)`);
        
        res.json({ success: true, count: totalSites });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: '保存失败: ' + e.message });
    }
});

// 浏览器自动打开逻辑
const openBrowser = (url) => {
    let command;
    switch (process.platform) {
        case 'darwin': command = `open "${url}"`; break;
        case 'win32': command = `start "" "${url}"`; break;
        default: command = `xdg-open "${url}"`; break;
    }
    exec(command, (error) => { if (error) console.error('无法自动打开浏览器'); });
};

app.listen(PORT, () => {
    console.log(`\n🚀 服务已启动 http://localhost:${PORT}/admin.html`);
    openBrowser(`http://localhost:${PORT}/admin.html`);
});
