
var BlendModes = require('../../renderer/BlendModes');
var Circle = require('../../geom/circle/Circle');
var CircleContains = require('../../geom/circle/Contains');
var Class = require('../../utils/Class');
var Components = require('../components');
var GameObject = require('../GameObject');
var Rectangle = require('../../geom/rectangle/Rectangle');
var RectangleContains = require('../../geom/rectangle/Contains');

//  A Zone is a non-rendering rectangular Game Object that has a position and size.
//  It has no texture and never renders, but does live on the display list and
//  can be moved, scaled and rotated like any other Game Object.

//  The default origin is 0.5, the center of the Zone, the same as with Game Objects.
//  It's useful for linking to drop zones and input hit areas and has a couple of helper methods specifically for this.
//  Also useful for object overlap checks, or as a base for your own non-displaying objects.

var Zone = new Class({

    Extends: GameObject,

    Mixins: [
        Components.GetBounds,
        Components.Origin,
        Components.ScaleMode,
        Components.Transform,
        Components.ScrollFactor,
        Components.Visible
    ],

    initialize:

    function Zone (scene, x, y, width, height)
    {
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }

        GameObject.call(this, scene, 'Zone');

        this.setPosition(x, y);

        this.width = width;
        this.height = height;

        this.blendMode = BlendModes.NORMAL;
    },

    displayWidth: {

        get: function ()
        {
            return this.scaleX * this.width;
        },

        set: function (value)
        {
            this.scaleX = value / this.width;
        }

    },

    displayHeight: {

        get: function ()
        {
            return this.scaleY * this.height;
        },

        set: function (value)
        {
            this.scaleY = value / this.height;
        }

    },

    setSize: function (width, height, resizeInput)
    {
        if (resizeInput === undefined) { resizeInput = true; }

        this.width = width;
        this.height = height;

        if (resizeInput && this.input && this.input.hitArea instanceof Rectangle)
        {
            this.input.hitArea.width = width;
            this.input.hitArea.height = height;
        }

        return this;
    },

    setDisplaySize: function (width, height)
    {
        this.displayWidth = width;
        this.displayHeight = height;

        return this;
    },

    //  Centered on the Zones x/y
    setCircleDropZone: function (radius)
    {
        return this.setDropZone(new Circle(0, 0, radius), CircleContains);
    },

    //  Centered on the Zones x/y position
    setRectangleDropZone: function (width, height)
    {
        var x = -(width / 2);
        var y = -(height / 2);

        return this.setDropZone(new Rectangle(x, y, width, height), RectangleContains);
    },

    //  Define your own shape as the drop zone
    setDropZone: function (shape, callback)
    {
        if (shape === undefined)
        {
            this.setRectangleDropZone(this.width, this.height);
        }
        else
        {
            if (!this.input)
            {
                this.setInteractive(shape, callback);
            }

            this.input.dropZone = true;
        }

        return this;
    },

    renderCanvas: function ()
    {
        return;
    },

    renderWebGL: function ()
    {
        return;
    }

});

module.exports = Zone;
