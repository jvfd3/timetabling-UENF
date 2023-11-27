import andamentoAlunosData from "../../DB/JSON/dynamic/andamentoAlunos.json";
import preferenciasProfessoresData from "../../DB/JSON/dynamic/preferenciasProfessores.json";
import turmas_2022Data from "../../DB/JSON/dynamic/turmas_2022.json";
import turmas_passadoData from "../../DB/JSON/dynamic/turmas_passado.json";
import turmasData from "../../DB/JSON/dynamic/turmas.json";
import RSalunosData from "../../DB/JSON/select/RSalunos.json";
import RSdisciplinasData from "../../DB/JSON/select/RSdisciplinas.json";
import RSprofessoresData from "../../DB/JSON/select/RSprofessores.json";
import RSsalasData from "../../DB/JSON/select/RSsalas.json";
import infoAlunosData from "../../DB/JSON/static/infoAlunos.json";
import infoDisciplinasCCData from "../../DB/JSON/static/infoDisciplinasCC.json";
import infoProfessoresData from "../../DB/JSON/static/infoProfessores.json";
import infoSalasData from "../../DB/JSON/static/infoSalas.json";

const allData = {
    dynamic: {
        andamentoAlunos: andamentoAlunosData,
        preferenciasProfessores: preferenciasProfessoresData,
        turmas_2022: turmas_2022Data,
        turmas_passado: turmas_passadoData,
        turmas: turmasData,
    },
    select: {
        RSalunos: RSalunosData,
        RSdisciplinas: RSdisciplinasData,
        RSprofessores: RSprofessoresData,
        RSsalas: RSsalasData,
    },
    static: {
        infoAlunos: infoAlunosData,
        infoDisciplinasCC: infoDisciplinasCCData,
        infoProfessores: infoProfessoresData,
        infoSalas: infoSalasData,
    }
}

export {allData};