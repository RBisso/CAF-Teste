import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Company from '../models/company';
import config from '../config/defaults'
import log from '../logger'
import services from '../services/brasilio'
import CompanyInterface from '../interfaces/company'
import PartnerInterface from '../interfaces/partners';


const createCompany = async (comp: CompanyInterface) => {

    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        cnpj: comp.cnpj,
        razao_social: comp.razao_social,
        uf: comp.uf,
        qsa: comp.qsa
    });

    //Returns an error code if an error occur trying to save the data in the database
    const code = await company.save()
    .then(() => {
        return 200
    })
    .catch((error) => {
        log.info(error)
        return 500
    });

    return code
}

const updateCompany = async (comp: CompanyInterface, cnpj: string) => {

    const code = await Company.findOneAndUpdate({ cnpj: cnpj }, comp, {new: true})
    .then(() => {
        return 200
    })
    .catch((error) => {
        log.info(error)
        return 500
    });

    return code
    
}

const formatData = (comp: CompanyInterface, part: PartnerInterface[]) => {

    part.forEach((elem) => {
        delete elem.cnpj
        delete elem.razao_social
    })
    comp.qsa = part
    return comp
}

const consultBrasilIo = async (cnpj: string) => {

    const [ company ] = await services.consultBrasilIo(cnpj, config.url_company_brasilio);
    const partners = await services.consultBrasilIo(cnpj, config.url_partners_brasilio);

    const formatedCompany = formatData(company, partners)

    return formatedCompany
}


const getCompany = async (req: Request, res: Response, next: NextFunction) => {

    if ( req.body.tipo == 'cacheado') {
        log.info('chacheado')
        await Company.findOne({ cnpj: req.body.cnpj })
        .exec()
        .then(async (result) => {
            if ( result ) {
                return res.status(200).json({
                    empresa: result
                })
            } else {
                const company = await consultBrasilIo(req.body.cnpj)
                const statusCode: number = await createCompany(company)
               
                if (statusCode == 200){
                    return res.status(200).json({
                        empresa: company
                    });
                } else {
                    return res.status(500).json({
                        mensagem: 'Internal error'
                    })
                }
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error. message,
                error
            });
        });
    } else if ( req.body.tipo == 'tempo_real') {
        log.info('tempo_real')
        const company = await consultBrasilIo(req.body.cnpj)
        const statusCode: number = await updateCompany(company, req.body.cnpj)
               
        if (statusCode == 200){
            return res.status(200).json({
                empresa: company
            });
        } else {
            return res.status(500).json({
                mensagem: 'Internal error'
            })
        }
    } else {
        return res.status(400).json({
            mensagem: "Bad Request"
        })
    }
};

export default {
    getCompany
};