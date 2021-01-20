export interface IStorageProvider {
	save(tmpFilePath: string): Promise<string>;
	remove(fileName: string): Promise<void>;
}