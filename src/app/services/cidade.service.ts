import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService, urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  async importCidades() {
    const municipios_api = this.http.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios").toPromise();

    municipios_api.then((municipios: any) => {
      municipios.forEach((municipio: any) => {
        const cidade: any = {
          nome: municipio.nome,
          estado_sigla: municipio.microrregiao.mesorregiao.UF.sigla
        }
        this.http.post(`${urlBase}/cidade`, cidade).toPromise().then((res) => { console.log("Cidade criada:" + res) });
      });
    }).catch((error: any) => {
      console.error('Erro ao obter cidades', error);
    });
  }

  async getCidadeByEstado(estado_sigla: string): Promise<any> {
    return this.http.get(`${urlBase}/cidadeEstado/${estado_sigla}`).toPromise();
  }

  async getCidadeByNome(estado_sigla: string, nome: string) {
    return this.http.get(`${urlBase}/cidadeNome/${estado_sigla}/${nome}`).toPromise();
  }

  async getCidadeById(id: number) {
    return this.http.get(`${urlBase}/cidade/${id}`).toPromise();
  }
}