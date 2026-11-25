function greeting() {
  return 'Chào bạn! Nhóm 9 đã sẵn sàng làm việc.';
}

// Cho phép kiểm tra cùng hàm này bằng Node.js và chạy trên trình duyệt.
if (typeof document !== 'undefined') {
  document.getElementById('hello').addEventListener('click', function () {
    document.getElementById('message').textContent = greeting();
  });
}
if (typeof module !== 'undefined') {
  module.exports = { greeting };
}
