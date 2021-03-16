export class MapManager {
    constructor(width, height) {
        this.layers = null;
        this.tilesets = [];
        this.imgCount = 0;
        this.isAllImgLoad = false;
        this.isMapLoad = false;
        this.view = {
            x: 0,
            y: 0,
            w: width,
            h: height
        }
    }

    loadMap(mapJson) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 200)
                this.parseMap(JSON.parse(req.responseText)); };
        req.open('GET', mapJson, true);
        req.send();
    }

    parseMap(map) {
        this.mapJSON = map;
        this.xCount = map.width;
        this.yCount = map.height;
        this.blockWidth = map.tilewidth;
        this.blockHeight = map.tileheight;
        this.mapWidth = this.xCount * this.blockWidth;
        this.mapHeight = this.yCount * this.blockHeight;
        for (let i = 0; i < map.tilesets.length; i++) {
            let img = new Image();
            img.onload = () => {
                this.imgCount++;
                if (this.imgCount === map.tilesets.length)
                    this.isAllImgLoad = true;
            };
            let path = map.tilesets[i].image;
            img.src = path;
            let current = map.tilesets[i];
            let tempTileset = {
                firstgid: current.firstgid,
                img: img,
                name: current.name,
                xCount: Math.floor(current.imagewidth / this.blockWidth),
                yCount: Math.floor(current.imageheight / this.blockHeight)
            };
            this.tilesets.push(tempTileset);
        }
        this.isMapLoad = true;
    }

    draw(context) {
        if (this.layers === null) {
            for (let i = 0; i < this.mapJSON.layers.length; i++) {
                let layer = this.mapJSON.layers[i];
                if (layer.type === 'tilelayer') {
                    this.layers = layer;
                    break;
                }
            }
        }
        for (let i = 0; i < this.layers.data.length; i++) {
            if (this.layers.data[i] !== 0) {
                let tile = this.getTile(this.layers.data[i]);
                let pixelX = (i % this.xCount) * this.blockWidth;
                let pixelY = Math.floor(i / this.xCount) * this.blockHeight;
                if (!this.isVisible(pixelX, pixelY, this.blockWidth, this.blockHeight))
                    continue;
                pixelX -= this.view.x;
                pixelY -= this.view.y;
                context.drawImage(tile.img, tile.px, tile.py, this.blockWidth, this.blockHeight, pixelX, pixelY, this.blockWidth, this.blockHeight);
            }
        }
    }

    getTile(index) {
        let tile = {
            img: null,
            px: 0,
            py: 0
        };
        let tileset = this.getTileset(index);
        tile.img = tileset.img;
        let id = index - tileset.firstgid;
        let x = id % tileset.xCount;
        let y = Math.floor(id / tileset.xCount);
        tile.px = x * this.blockWidth;
        tile.py = y * this.blockHeight;
        return tile;
    }

    getTileset(index) {
        for (let i = this.tilesets.length - 1; i >= 0; i--) {
            if (this.tilesets[i].firstgid <= index)
                return this.tilesets[i];
        }
        return null;
    }

    getMapJson() {
        return this.mapJSON;
    }

    getTilesetIndex(x, y) {
        let wX = x;
        let wY = y;
        let index = Math.floor(wY / this.blockHeight) * this.xCount + Math.floor(wX / this.blockWidth);
        return this.layers.data[index];
    }

    isVisible(x, y, width, height) {
        if (x + width < this.view.x || y + height < this.view.y || x > this.view.x + this.view.w || y > this.view.y + this.view.h)
            return false;
        return true;
    }

    centerAt(x, y) {
        if (x < this.view.w/2)
            this.view.x = 0;
        else if (x > this.mapWidth - this.view.w/2)
            this.view.x = this.mapWidth - this.view.w;
        else
            this.view.x = x - (this.view.w/2);

        if (y < this.view.h/2)
            this.view.y = 0;
        else if (y > this.mapHeight - this.view.h/2)
            this.view.y = this.mapHeight - this.view.h;
        else
            this.view.y = y - (this.view.h/2);
    }
}
