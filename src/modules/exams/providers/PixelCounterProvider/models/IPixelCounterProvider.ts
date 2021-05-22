export interface IPixelCounterProvider {
	countNotNullPixels(imgPath: string): Promise<number>;
}