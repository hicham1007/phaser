/**
 * [description]
 *
 * @function Phaser.Geom.Line.Offset
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - [description]
 * @param {number} x - [description]
 * @param {number} y - [description]
 *
 * @return {Phaser.Geom.Line} [description]
 */
var Offset = function (line, x, y)
{
    line.x1 += x;
    line.y1 += y;

    line.x2 += x;
    line.y2 += y;

    return line;
};

module.exports = Offset;
