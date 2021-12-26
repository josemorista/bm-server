import { IExam } from '../../../entities/models/IExam';

export type ICreateExamDTO = Pick<IExam, 'id' | 'category' | 'dicomFileLocation' | 'label' | 'patientId' | 'date' | 'radioTracerApplicationHours'>

export type IUpdateExamDTO = Partial<IExam>;
export interface IExamsRepository {
	create(data: ICreateExamDTO): Promise<IExam>;
	findById(id: string): Promise<IExam>;
	findByPatient(patientId: string): Promise<Array<IExam>>;
	updateById(id: string, data: IUpdateExamDTO): Promise<void>;
}