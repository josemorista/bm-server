export interface ISegmentedExam {
	examId: string;
	algorithm: 'randomForest' | 'SVM';
	threshold: number;
	createdAt: Date | string;
	updatedAt: Date | string;
}