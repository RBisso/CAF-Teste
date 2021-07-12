import { Document } from 'mongoose';
import  Partner  from './partners';

export default interface Company extends Partner, Document {
    cnpj: string;
    razao_social: string;
    uf: string;
    qsa: Partner[]
}