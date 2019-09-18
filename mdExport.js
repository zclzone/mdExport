(function (global, Md) {
  global.Md = Md();
})(this, function () {
  function Md (options) {
    options = options || {};
    this.mdData = options.mdData || '';
    this.fileName = options.fileName;
    this.downloadLink = document.createElement('a');
  }

  Md.prototype.export = function () {
    if (!this.mdData) return
    let blob = new Blob([this.mdData], { type: "application/octet-stream", });
    this.downloadLink.href = window.URL.createObjectURL(blob);
    this.downloadLink.download = this.fileName || this.generateName();
    this.downloadLink.click();
    window.URL.revokeObjectURL(this.downloadLink.href); //释放内存
  }

  Md.prototype.formatNumber = function (n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
  }

  Md.prototype.generateName = function () {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(this.formatNumber).join('');
    const t2 = [hour, minute, second].map(this.formatNumber).join('');

    return `${t1}_${t2}.md`;
  }

  return Md;
})