const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { greeting } = require('./app.js');

assert.equal(greeting(), 'Chào bạn! Nhóm 9 đã sẵn sàng làm việc.');

// Thực thi mã sự kiện với DOM giả nhỏ, không cần cài thư viện.
const message = { textContent: '' };
let onClick;
vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), {
  document: {
    getElementById(id) {
      if (id === 'message') return message;
      if (id === 'hello') return {
        addEventListener(event, callback) {
          assert.equal(event, 'click');
          onClick = callback;
        }
      };
      throw new Error('Không tìm thấy phần tử: ' + id);
    }
  }
});
assert.equal(typeof onClick, 'function');
onClick();
assert.equal(message.textContent, greeting());

// Kiểm tra gói triển khai có đủ file mà trang HTML tham chiếu.
const html = fs.readFileSync('dist/index.html', 'utf8');
assert.match(html, /id="hello"/);
assert.match(html, /id="message"/);
assert.match(html, /src="app\.js"/);
assert.equal(fs.readFileSync('dist/app.js', 'utf8'), fs.readFileSync('app.js', 'utf8'));
console.log('PASS: lời chào, thao tác nhấn nút và gói triển khai.');
