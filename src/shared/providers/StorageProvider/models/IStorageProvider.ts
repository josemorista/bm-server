export interface IStorageProvider {
	save(tmpFilePath: string, filename?: string): Promise<string>;
	remove(fileName: string): Promise<void>;
}