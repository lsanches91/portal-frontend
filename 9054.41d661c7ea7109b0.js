"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9054],{9054:(P,p,l)=>{l.r(p),l.d(p,{ListarRacaPageModule:()=>C});var _=l(6814),d=l(95),n=l(3582),g=l(3044),s=l(5861),e=l(6689),m=l(4414),f=l(6448),h=l(8165);function Z(i,r){if(1&i){const a=e.EpF();e.TgZ(0,"ion-fab-button",23),e.NdJ("click",function(){e.CHM(a);const o=e.oxw().$implicit,c=e.oxw();return e.KtG(c.enviaAprovaRaca(o.id))}),e._UZ(1,"ion-icon",24),e.qZA()}}function v(i,r){if(1&i){const a=e.EpF();e.TgZ(0,"ion-item")(1,"ion-label"),e._uU(2),e.qZA(),e.TgZ(3,"ion-fab",12)(4,"ion-fab-button",13),e._UZ(5,"ion-icon",14),e.qZA(),e.TgZ(6,"ion-fab-list",15),e.YNc(7,Z,2,0,"ion-fab-button",16),e.TgZ(8,"ion-fab-button",17),e.NdJ("click",function(){const c=e.CHM(a).$implicit,u=e.oxw();return e.KtG(u.confirmaExclusao(c.id))}),e._UZ(9,"ion-icon",18),e.qZA(),e.TgZ(10,"ion-fab-button",19),e.NdJ("click",function(){const c=e.CHM(a).$implicit,u=e.oxw();return e.KtG(u.atualizarRacaSelecionada(c.id))}),e._UZ(11,"ion-icon",20),e.qZA(),e.TgZ(12,"ion-fab-button",21),e.NdJ("click",function(){const c=e.CHM(a).$implicit,u=e.oxw();return e.KtG(u.visualizarRacaSelecionada(c.id))}),e._UZ(13,"ion-icon",22),e.qZA()()()()}if(2&i){const a=r.$implicit;e.xp6(2),e.Oqu(a.nome),e.xp6(5),e.Q6J("ngIf","Pendente"===a.situacao)}}function R(i,r){if(1&i){const a=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Visualizar Ra\xe7a"),e.qZA()()(),e.TgZ(4,"ion-content",25)(5,"ion-card",26)(6,"ion-item"),e._UZ(7,"ion-input",27),e.qZA(),e.TgZ(8,"ion-item"),e._UZ(9,"ion-input",28),e.qZA(),e.TgZ(10,"ion-item"),e._UZ(11,"ion-input",29),e.qZA(),e.TgZ(12,"ion-button",30),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.openVisualizarRaca(!1))}),e._uU(13," Voltar "),e.qZA()()()}if(2&i){const a=e.oxw();e.xp6(7),e.s9C("value",a.racaSelecionada.nome),e.Q6J("disabled",!0),e.xp6(2),e.s9C("value",a.racaSelecionada.especie.nome_comum),e.Q6J("disabled",!0),e.xp6(2),e.s9C("value",a.racaSelecionada.situacao),e.Q6J("disabled",!0)}}function x(i,r){if(1&i&&(e.TgZ(0,"ion-select-option",34),e._uU(1),e.qZA()),2&i){const a=r.$implicit;e.s9C("value",a.id),e.xp6(1),e.Oqu(a.nome_comum)}}function T(i,r){if(1&i){const a=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Atualizar Ra\xe7a"),e.qZA()()(),e.TgZ(4,"ion-content",25)(5,"ion-card",26)(6,"ion-item")(7,"ion-input",31),e.NdJ("ngModelChange",function(o){e.CHM(a);const c=e.oxw();return e.KtG(c.racaSelecionada.nome=o)}),e.qZA()(),e.TgZ(8,"ion-item")(9,"ion-select",32),e.NdJ("ngModelChange",function(o){e.CHM(a);const c=e.oxw();return e.KtG(c.racaSelecionada.especie.id=o)}),e.YNc(10,x,2,2,"ion-select-option",33),e.qZA()(),e.TgZ(11,"ion-item"),e._UZ(12,"ion-input",29),e.qZA(),e.TgZ(13,"ion-button",5),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.atualizaRaca())}),e._uU(14," Enviar "),e.qZA(),e.TgZ(15,"ion-button",30),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.openAtualizarRaca(!1))}),e._uU(16," Voltar "),e.qZA()()()}if(2&i){const a=e.oxw();e.xp6(7),e.Q6J("counter",!0)("ngModel",a.racaSelecionada.nome),e.xp6(2),e.Q6J("placeholder",a.racaSelecionada.especie.nome_comum)("ngModel",a.racaSelecionada.especie.id),e.xp6(1),e.Q6J("ngForOf",a.especies),e.xp6(2),e.s9C("value",a.racaSelecionada.situacao),e.Q6J("disabled",!0)}}function A(i,r){if(1&i&&(e.TgZ(0,"ion-select-option",34),e._uU(1),e.qZA()),2&i){const a=r.$implicit;e.s9C("value",a.id),e.xp6(1),e.Oqu(a.nome_comum)}}function b(i,r){if(1&i){const a=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Adicionar Ra\xe7a"),e.qZA()()(),e.TgZ(4,"ion-content",25)(5,"ion-card",26)(6,"ion-item")(7,"ion-input",31),e.NdJ("ngModelChange",function(o){e.CHM(a);const c=e.oxw();return e.KtG(c.racaNova.nome=o)}),e.qZA()(),e.TgZ(8,"ion-item")(9,"ion-select",35),e.NdJ("ngModelChange",function(o){e.CHM(a);const c=e.oxw();return e.KtG(c.racaNova.especie_id=o)}),e.YNc(10,A,2,2,"ion-select-option",33),e.qZA()(),e.TgZ(11,"ion-item")(12,"ion-select",36),e.NdJ("ngModelChange",function(o){e.CHM(a);const c=e.oxw();return e.KtG(c.racaNova.situacao=o)}),e.TgZ(13,"ion-select-option",37),e._uU(14,"Aprovado"),e.qZA(),e.TgZ(15,"ion-select-option",38),e._uU(16,"Pendente"),e.qZA()()(),e.TgZ(17,"ion-button",5),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.criaRaca())}),e._uU(18," Enviar "),e.qZA(),e.TgZ(19,"ion-button",30),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.openAdicionarRaca(!1))}),e._uU(20," Voltar "),e.qZA()()()}if(2&i){const a=e.oxw();e.xp6(7),e.Q6J("counter",!0)("ngModel",a.racaNova.nome),e.xp6(2),e.Q6J("ngModel",a.racaNova.especie_id),e.xp6(1),e.Q6J("ngForOf",a.especies),e.xp6(2),e.Q6J("ngModel",a.racaNova.situacao)}}const M=[{path:"",component:(()=>{class i{constructor(a,t,o,c){this.toastController=a,this.alertController=t,this.racaService=o,this.especieService=c,this.isAprovado=!0,this.isModalVisualizarOpen=!1,this.isModalAtualizarOpen=!1,this.isModalAdicionarOpen=!1,this.titulo="Aprovadas",this.racaSelecionada={nome:"",situacao:"",especie_id:"",especie:{id:"",nome_comum:"",nome_cientifico:"",situacao:""}},this.racaNova={nome:"",situacao:"Aprovado",especie_id:""},this.getRacaBySitucao("Aprovado"),this.especieService.getEspecieBySituacao("Aprovado").then(u=>{this.especies=u}).catch(u=>{console.log(u)})}postRaca(a){var t=this;return(0,s.Z)(function*(){t.racaService.create(a).then(o=>{t.retorno=o,console.log(t.retorno)}).catch(o=>{console.log(o)})})()}criaRaca(){var a={nome:"",situacao:"",especie_id:""};this.racaService.getSingleRacaByEspecieENome(this.racaNova.nome,this.racaNova.especie_id).then(t=>{a=t,console.log(a),null==a?this.camposValidos(this.racaNova)?(this.postRaca(this.racaNova),this.presentToast("Ra\xe7a cadastrada com sucesso!"),setTimeout(()=>{window.location.reload()},1e3)):this.presentToast("Campos inv\xe1lidos."):this.presentToast("J\xe1 existe uma ra\xe7a com esse nome para a esp\xe9cie selecionada.")}).catch(t=>{console.log(t)})}getRacaBySitucao(a){var t=this;return(0,s.Z)(function*(){"Pendente"==a||"Aprovado"==a?t.racaService.getRacaBySituacao(a).then(o=>{t.racas=o,t.titulo="Pendente"==a?"Pendentes":"Aprovadas"}).catch(o=>{console.log(o)}):t.presentToast("Situac\xe3o precisa ser 'Pendente' ou 'Aprovado'")})()}getRacaById(a){var t=this;return(0,s.Z)(function*(){t.racaService.getSingleRaca(a).then(o=>{t.racaSelecionada=o,console.log(t.racaSelecionada)}).catch(o=>{console.log(o)})})()}putRaca(a){var t=this;return(0,s.Z)(function*(){t.camposValidos(a)?t.racaService.update(a.id,a).then(o=>{t.retorno=o}).catch(o=>{console.log(o)}):t.presentToast("Informa\xe7\xf5es inv\xe1lidas.")})()}atualizaRaca(){const a={id:this.racaSelecionada.id,nome:this.racaSelecionada.nome,especie_id:this.racaSelecionada.especie_id,situacao:this.racaSelecionada.situacao};console.log(a),this.putRaca(a),this.presentToast("Ra\xe7a atualizada com sucesso!"),setTimeout(()=>{this.openAtualizarRaca(!1),window.location.reload()},500)}deleteRaca(a){var t=this;return(0,s.Z)(function*(){t.racaService.delete(a).then(o=>{t.retorno=o,console.log(t.retorno),t.presentToast("Ra\xe7a exclu\xedda com sucesso!"),setTimeout(()=>{window.location.reload()},500)}).catch(o=>{console.log(o)})})()}aprovaRaca(){var a={id:this.racaSelecionada.id,nome:this.racaSelecionada.nome,especie_id:this.racaSelecionada.especie_id,situacao:"Aprovado"};console.log("Dentro do aprovaRaca"),console.log(a),this.putRaca(a),this.presentToast("Ra\xe7a aprovada com sucesso!"),setTimeout(()=>{window.location.reload()},500)}enviaAprovaRaca(a){var t=this;return(0,s.Z)(function*(){t.racaService.getSingleRaca(a).then(o=>{t.racaSelecionada=o,console.log("Dentro do enviaAprovaRaca"),console.log(t.racaSelecionada),t.aprovaRaca()}).catch(o=>{console.log(o)})})()}openVisualizarRaca(a){var t=this;return(0,s.Z)(function*(){t.isModalVisualizarOpen=a})()}visualizarRacaSelecionada(a){var t=this;return(0,s.Z)(function*(){yield t.getRacaById(a),t.openVisualizarRaca(!0)})()}openAtualizarRaca(a){var t=this;return(0,s.Z)(function*(){t.isModalAtualizarOpen=a})()}atualizarRacaSelecionada(a){var t=this;return(0,s.Z)(function*(){yield t.getRacaById(a),t.openAtualizarRaca(!0)})()}openAdicionarRaca(a){var t=this;return(0,s.Z)(function*(){t.isModalAdicionarOpen=a})()}camposValidos(a){for(const t in a)if(!a[t])return"string"==typeof a[t]&&a[t].trim(),!1;return!0}confirmaExclusao(a){var t=this;return(0,s.Z)(function*(){yield(yield t.alertController.create({header:"Confirmar exclus\xe3o?",buttons:[{text:"N\xe3o"},{text:"Sim",handler:()=>{t.deleteRaca(a)}}]})).present()})()}presentToast(a){var t=this;return(0,s.Z)(function*(){(yield t.toastController.create({message:a,duration:4e3,position:"top"})).present()})()}ngOnInit(){}static#e=this.\u0275fac=function(t){return new(t||i)(e.Y36(m.yF),e.Y36(m.Br),e.Y36(f.v),e.Y36(h.I))};static#a=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-listar-raca"]],decls:39,vars:11,consts:[[3,"translucent"],[3,"fullscreen"],["collapse","condense"],["size","large"],["size-lg","4","offset-lg","4","size-xs","12","offset-xs","0"],["size","default","expand","block",3,"click"],["slot","start","name","add-circle-outline"],["size-lg","6","offset-lg","3","size-xs","12","offset-xs","0"],[3,"inset"],["lines","full"],[4,"ngFor","ngForOf"],[3,"isOpen","backdropDismiss"],["horizontal","end"],["size","small","color","secondary"],["name","add"],["side","start"],["color","success",3,"click",4,"ngIf"],["color","danger",3,"click"],["name","trash-outline"],["color","warning",3,"click"],["name","brush-outline"],["color","primary",3,"click"],["name","eye-outline"],["color","success",3,"click"],["name","checkbox-outline"],[1,"ion-padding"],[2,"padding","15px"],["label","Nome","labelPlacement","stacked",3,"value","disabled"],["label","Esp\xe9cie","labelPlacement","stacked",3,"value","disabled"],["label","Situa\xe7\xe3o","labelPlacement","stacked",3,"value","disabled"],["size","default","expand","block","fill","outline",3,"click"],["label","Nome","labelPlacement","stacked","maxlength","45",3,"counter","ngModel","ngModelChange"],["fill","solid","label","Esp\xe9cie","interface","popover","labelPlacement","stacked",3,"placeholder","ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["fill","solid","label","Esp\xe9cie","interface","popover","labelPlacement","stacked",3,"ngModel","ngModelChange"],["fill","solid","label","Situa\xe7\xe3o","interface","popover","labelPlacement","stacked",3,"ngModel","ngModelChange"],["value","Aprovado"],["value","Pendente"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e._uU(3,"Listar Ra\xe7a"),e.qZA()()(),e.TgZ(4,"ion-content",1)(5,"ion-header",2)(6,"ion-toolbar")(7,"ion-title",3),e._uU(8,"Ra\xe7as"),e.qZA()()(),e.TgZ(9,"ion-grid")(10,"ion-row")(11,"ion-col",4)(12,"ion-row")(13,"ion-col")(14,"ion-button",5),e.NdJ("click",function(){return o.getRacaBySitucao("Aprovado")}),e._uU(15," Aprovados "),e.qZA()(),e.TgZ(16,"ion-col")(17,"ion-button",5),e.NdJ("click",function(){return o.getRacaBySitucao("Pendente")}),e._uU(18," Pendentes "),e.qZA()()()()(),e.TgZ(19,"ion-row")(20,"ion-col",4)(21,"ion-row")(22,"ion-col")(23,"ion-button",5),e.NdJ("click",function(){return o.openAdicionarRaca(!0)}),e._UZ(24,"ion-icon",6),e._uU(25," Adicionar "),e.qZA()()()()(),e.TgZ(26,"ion-row")(27,"ion-col",7)(28,"ion-list",8)(29,"ion-list-header",9)(30,"ion-label"),e._uU(31),e.qZA()(),e.YNc(32,v,14,2,"ion-item",10),e.qZA()()()(),e.TgZ(33,"ion-modal",11),e.YNc(34,R,14,6,"ng-template"),e.qZA(),e.TgZ(35,"ion-modal",11),e.YNc(36,T,17,7,"ng-template"),e.qZA(),e.TgZ(37,"ion-modal",11),e.YNc(38,b,21,5,"ng-template"),e.qZA()()),2&t&&(e.Q6J("translucent",!0),e.xp6(4),e.Q6J("fullscreen",!0),e.xp6(24),e.Q6J("inset",!0),e.xp6(3),e.hij("Ra\xe7as ",o.titulo,""),e.xp6(1),e.Q6J("ngForOf",o.racas),e.xp6(1),e.Q6J("isOpen",o.isModalVisualizarOpen)("backdropDismiss",!1),e.xp6(2),e.Q6J("isOpen",o.isModalAtualizarOpen)("backdropDismiss",!1),e.xp6(2),e.Q6J("isOpen",o.isModalAdicionarOpen)("backdropDismiss",!1))},dependencies:[_.sg,_.O5,d.JJ,d.nD,d.On,n.YG,n.PM,n.wI,n.W2,n.IJ,n.W4,n.zq,n.jY,n.Gu,n.gu,n.pK,n.Ie,n.Q$,n.q_,n.yh,n.Nd,n.t9,n.n0,n.wd,n.sr,n.ki,n.QI,n.j9]})}return i})()}];let S=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#a=this.\u0275mod=e.oAB({type:i});static#t=this.\u0275inj=e.cJS({imports:[g.Bz.forChild(M),g.Bz]})}return i})(),C=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#a=this.\u0275mod=e.oAB({type:i});static#t=this.\u0275inj=e.cJS({imports:[_.ez,d.u5,n.Pc,S]})}return i})()}}]);