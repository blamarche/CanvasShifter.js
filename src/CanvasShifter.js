/*
Copyright (C) 2011 by Brendan LaMarche

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function CanvasShifter(imgIn, imgOut, params, pxFunc) {
    this.imgIn = imgIn;
    this.imgOut = imgOut;
    
    this.imgInData = imgIn.data; //removing the reference to the imagedata object for speed
    this.imgOutData = imgOut.data; //removing the reference to the imagedata object for speed

    this.pxFunc = pxFunc;
    this.pxParams = params;

    this.timeToComplete = 0;
}
	
	CanvasShifter.prototype.run = function() {
		var startDate = new Date();
		
		//do the bending
		for (var xx =0; xx < this.imgIn.width; xx++)
		{
			for (var yy=0; yy < this.imgIn.height; yy++)
			{
				this.pxFunc(this, xx, yy, this.imgIn, this.pxParams, this.imgOut);
			}
		}
		
		var endDate = new Date();
		this.timeToComplete = endDate.getTime() - startDate.getTime();
		
		return this;
	}
	
	CanvasShifter.prototype.output = function() {
		this.imgOut.data = this.imgOutData;
		return this.imgOut;
	}
	
	CanvasShifter.prototype.getPx = function(x,y) {
        return [this.imgInData[((y*(this.imgIn.width*4)) + (x*4))],
                this.imgInData[((y*(this.imgIn.width*4)) + (x*4))+1],
                this.imgInData[((y*(this.imgIn.width*4)) + (x*4))+2],
                this.imgInData[((y*(this.imgIn.width*4)) + (x*4))+3]
               ];
	}
	
	CanvasShifter.prototype.setPx = function(x,y, pxarray4) {
	    this.imgOutData[((y*(this.imgIn.width*4)) + (x*4))] = pxarray4[0];
	    this.imgOutData[((y*(this.imgIn.width*4)) + (x*4))+1] = pxarray4[1];
	    this.imgOutData[((y*(this.imgIn.width*4)) + (x*4))+2] = pxarray4[2];
	    this.imgOutData[((y*(this.imgIn.width*4)) + (x*4))+3] = pxarray4[3];
	}
	
	CanvasShifter.ImageDataFromImage = function(image, width, height) {
	    var buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        var ctx = buffer.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0,0,width,height);
	}



