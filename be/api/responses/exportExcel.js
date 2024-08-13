module.exports = function exportExcel(bin) {
    this.res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    this.res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
    this.res.end(bin, 'binary');
    // this.res.json({ code: 0 });
}