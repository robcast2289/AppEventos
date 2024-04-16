export interface DetalleLogin {
    Detalle:            any[];
    Horario:            Horario[];
    Personal:           Personal[];
    PersonalExterno:    any[];
    Galeria:            any[];
    Agenda:             any[];
    ActividadesxSemana: ActividadesxSemana;
}

export interface ActividadesxSemana {
    Actividades: any[];
}

export interface Horario {
    Dia:         string;
    Dianombre:   string;
    Horaini:     Date;
    Horafin:     Date;
    Torre:       String;
    Salon:       string;
    Correlativo: string;
}

export interface Personal {
    Nombre:      string;
    Puesto:      string;
    Correlativo: string;
    FOTO:        string;
}
