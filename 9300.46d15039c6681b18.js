"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9300],{9300:(C,_,l)=>{l.r(_),l.d(_,{EditarOngPageModule:()=>J});var h=l(6814),u=l(95),s=l(3582),m=l(5233),p=l(3044),g=l(5861),e=l(6689),c=l(4414),r=l(6975),O=l(9393),E=l(83),T=l(6080),Z=l(2321);function P(d,M){if(1&d&&(e.TgZ(0,"ion-select-option",25),e._uU(1),e.qZA()),2&d){const t=M.$implicit;e.s9C("value",t.sigla),e.xp6(1),e.Oqu(t.nome)}}function S(d,M){if(1&d&&(e.TgZ(0,"ion-select-option",25),e._uU(1),e.qZA()),2&d){const t=M.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.nome)}}const y=[{path:"",component:(()=>{class d{constructor(t,o,n,a,i,A,N,k){this.route=t,this.toastController=o,this.ongService=n,this.estadoService=a,this.cidadeService=i,this.utilsService=A,this.geolocalizacaoService=N,this.router=k,this.ongSelecionada={},this.novaOng={nome_fantasia:"",cnpj:"",email:"",telefone:"",logradouro:"",numero:"",bairro:"",cep:"",cidade_id:0,descricao:"",situacao:"",logo_path:""},this.estados=[],this.cidades=[],this.estadoSelecionado="",this.cidadeSelecionada="",this.cidadeSelecionada_id="",this.selectDisabled=!0,this.telMask={mask:["(",/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/]},this.cnpjMask={mask:[/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/]},this.maskPredicate=function(){var f=(0,g.Z)(function*(v){return v.getInputElement()});return function(v){return f.apply(this,arguments)}}(),this.route.params.subscribe(f=>{f.id&&this.getSingleOng(+f.id)})}verificaEstados(){var t=this;return(0,g.Z)(function*(){t.estadoService.getAll().then(function(){var o=(0,g.Z)(function*(n){0==n.length&&(t.utilsService.presentToast("Importando estados e cidades, isso pode demorar um pouco..."),yield t.estadoService.importEstados(),yield t.cidadeService.importCidades(),t.estados=n)});return function(n){return o.apply(this,arguments)}}()).catch(o=>{console.log(o)})})()}onEstadoChange(t){this.cidadeService.getCidadeByEstado(t.detail.value).then(n=>{this.cidades=n||{},this.cidadeSelecionada="",this.selectDisabled=!1}).catch(n=>{console.log(n)})}onCidadeChange(t){this.cidadeService.getCidadeById(t.detail.value).then(n=>{this.cidadeSelecionada=n.nome,console.log(this.cidadeSelecionada)}).catch(n=>{this.utilsService.presentToastError(n.error.error)})}buscarEndereco(){var t=this;return(0,g.Z)(function*(){if(""==t.novaOng.cep)t.utilsService.presentToastWarning("Preencha o CEP");else{let o=parseInt(t.novaOng.cep.replace(/\D/g,""));yield t.geolocalizacaoService.getAddresByCEP(o).then(function(){var n=(0,g.Z)(function*(a){t.novaOng.logradouro=a.logradouro,t.novaOng.bairro=a.bairro,yield t.cidadeService.getCidadeByNome(a.uf,a.localidade).then(i=>{t.cidadeSelecionada=i.nome,t.cidadeSelecionada_id=i.id,t.estadoSelecionado=i.estado_sigla,t.selectDisabled=!1})});return function(a){return n.apply(this,arguments)}}())}})()}getSingleOng(t){this.ongService.getSingleOng(t).then(o=>{this.ongSelecionada=o,this.novaOng=this.ongSelecionada}).catch(o=>{console.log(o)})}putOng(t){this.camposValidos(t)&&(this.novaOng.cidade_id=parseInt(this.cidadeSelecionada_id),this.ongService.update(this.ongSelecionada.id,this.novaOng).then(o=>{console.log(this.novaOng),this.retorno=o,console.log(this.retorno),this.presentToast("ONG editada com sucesso!")}).catch(o=>{console.log(o)}))}enviaOng(){this.putOng(this.novaOng),setTimeout(()=>{this.voltaPagina()},1e3)}voltaPagina(){this.router.navigate(["listar-ong"])}camposValidos(t){for(const o in t)if(!t[o])return"string"==typeof t[o]&&t[o].trim(),!1;return!0}presentToast(t){var o=this;return(0,g.Z)(function*(){(yield o.toastController.create({message:t,duration:4e3,position:"top"})).present()})()}ngOnInit(){}static#e=this.\u0275fac=function(o){return new(o||d)(e.Y36(p.gz),e.Y36(c.yF),e.Y36(r.r),e.Y36(O.s),e.Y36(E.F),e.Y36(T.FW),e.Y36(Z.z),e.Y36(p.F0))};static#n=this.\u0275cmp=e.Xpm({type:d,selectors:[["app-editar-ong"]],decls:57,vars:23,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["collapse","condense"],["size","large"],["size-lg","4","offset-lg","4","size-xs","12","offset-xs","0"],[2,"padding","15px"],["label","Nome Fantasia","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label","CNPJ","label-placement","floating","fill","solid","type","text",3,"maskito","maskitoElement","ngModel","ngModelChange"],["label","Email","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label","Telefone","label-placement","floating","fill","solid","type","text",3,"maskito","maskitoElement","ngModel","ngModelChange"],["label","Logradouro","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label","N\xfamero","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label","Bairro","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label","CEP","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label-placement","floating",3,"ngModel","placeholder","ngModelChange","ionChange","click"],["slot","label"],["color","danger"],[3,"value",4,"ngFor","ngForOf"],["label-placement","floating",3,"disabled","ngModel","placeholder","ngModelChange","click","ionChange"],["label","Descri\xe7\xe3o","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["label","Logo","label-placement","floating","fill","solid","type","text",3,"ngModel","ngModelChange"],["size-lg","2","offset-lg","5","size-xs","12","offset-xs","0"],["size","default","expand","block",3,"click"],["size","default","expand","block","fill","outline",3,"click"],[3,"value"]],template:function(o,n){1&o&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Editar Ong"),e.qZA()()(),e.TgZ(6,"ion-content",2)(7,"ion-header",3)(8,"ion-toolbar")(9,"ion-title",4),e._uU(10,"Editando ONG"),e.qZA()()(),e.TgZ(11,"ion-grid")(12,"ion-row")(13,"ion-col",5)(14,"ion-list",6)(15,"ion-item")(16,"ion-input",7),e.NdJ("ngModelChange",function(i){return n.novaOng.nome_fantasia=i}),e.qZA()(),e.TgZ(17,"ion-item")(18,"ion-input",8),e.NdJ("ngModelChange",function(i){return n.novaOng.cnpj=i}),e.qZA()(),e.TgZ(19,"ion-item")(20,"ion-input",9),e.NdJ("ngModelChange",function(i){return n.novaOng.email=i}),e.qZA()(),e.TgZ(21,"ion-item")(22,"ion-input",10),e.NdJ("ngModelChange",function(i){return n.novaOng.telefone=i}),e.qZA()(),e.TgZ(23,"ion-item")(24,"ion-input",11),e.NdJ("ngModelChange",function(i){return n.novaOng.logradouro=i}),e.qZA()(),e.TgZ(25,"ion-item")(26,"ion-input",12),e.NdJ("ngModelChange",function(i){return n.novaOng.numero=i}),e.qZA()(),e.TgZ(27,"ion-item")(28,"ion-input",13),e.NdJ("ngModelChange",function(i){return n.novaOng.bairro=i}),e.qZA()(),e.TgZ(29,"ion-item")(30,"ion-input",14),e.NdJ("ngModelChange",function(i){return n.novaOng.cep=i}),e.qZA()(),e.TgZ(31,"ion-item")(32,"ion-select",15),e.NdJ("ngModelChange",function(i){return n.estadoSelecionado=i})("ionChange",function(i){return n.onEstadoChange(i)})("click",function(){return n.verificaEstados()}),e.TgZ(33,"div",16),e._uU(34,"Estado"),e.TgZ(35,"ion-text",17),e._uU(36,"*"),e.qZA()(),e.YNc(37,P,2,2,"ion-select-option",18),e.qZA()(),e.TgZ(38,"ion-item")(39,"ion-select",19),e.NdJ("ngModelChange",function(i){return n.cidadeSelecionada_id=i})("click",function(){return n.verificaEstados()})("ionChange",function(i){return n.onCidadeChange(i)}),e.TgZ(40,"div",16),e._uU(41,"Cidade"),e.TgZ(42,"ion-text",17),e._uU(43,"*"),e.qZA()(),e.YNc(44,S,2,2,"ion-select-option",18),e.qZA()(),e.TgZ(45,"ion-item")(46,"ion-input",20),e.NdJ("ngModelChange",function(i){return n.novaOng.descricao=i}),e.qZA()(),e.TgZ(47,"ion-item")(48,"ion-input",21),e.NdJ("ngModelChange",function(i){return n.novaOng.logo_path=i}),e.qZA()()()()(),e.TgZ(49,"ion-row")(50,"ion-col",22)(51,"ion-button",23),e.NdJ("click",function(){return n.enviaOng()}),e._uU(52,"Enviar"),e.qZA()()(),e.TgZ(53,"ion-row")(54,"ion-col",22)(55,"ion-button",24),e.NdJ("click",function(){return n.voltaPagina()}),e._uU(56,"Voltar"),e.qZA()()()()()),2&o&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(10),e.Q6J("ngModel",n.novaOng.nome_fantasia),e.xp6(2),e.Q6J("maskito",n.cnpjMask)("maskitoElement",n.maskPredicate)("ngModel",n.novaOng.cnpj),e.xp6(2),e.Q6J("ngModel",n.novaOng.email),e.xp6(2),e.Q6J("maskito",n.telMask)("maskitoElement",n.maskPredicate)("ngModel",n.novaOng.telefone),e.xp6(2),e.Q6J("ngModel",n.novaOng.logradouro),e.xp6(2),e.Q6J("ngModel",n.novaOng.numero),e.xp6(2),e.Q6J("ngModel",n.novaOng.bairro),e.xp6(2),e.Q6J("ngModel",n.novaOng.cep),e.xp6(2),e.Q6J("ngModel",n.estadoSelecionado)("placeholder",n.estadoSelecionado),e.xp6(5),e.Q6J("ngForOf",n.estados),e.xp6(2),e.Q6J("disabled",n.selectDisabled)("ngModel",n.cidadeSelecionada_id)("placeholder",n.cidadeSelecionada),e.xp6(5),e.Q6J("ngForOf",n.cidades),e.xp6(2),e.Q6J("ngModel",n.novaOng.descricao),e.xp6(2),e.Q6J("ngModel",n.novaOng.logo_path))},dependencies:[h.sg,u.JJ,u.On,s.YG,s.Sm,s.wI,s.W2,s.jY,s.Gu,s.pK,s.Ie,s.q_,s.fG,s.Nd,s.t9,s.n0,s.yW,s.wd,s.sr,s.QI,s.j9,m.ro]})}return d})()}];let b=(()=>{class d{static#e=this.\u0275fac=function(o){return new(o||d)};static#n=this.\u0275mod=e.oAB({type:d});static#t=this.\u0275inj=e.cJS({imports:[p.Bz.forChild(y),p.Bz]})}return d})(),J=(()=>{class d{static#e=this.\u0275fac=function(o){return new(o||d)};static#n=this.\u0275mod=e.oAB({type:d});static#t=this.\u0275inj=e.cJS({imports:[h.ez,u.u5,s.Pc,m.U5,b]})}return d})()},2321:(C,_,l)=>{l.d(_,{z:()=>p});var h=l(5861),u=l(6689),s=l(9862),m=l(6080);let p=(()=>{class g{constructor(c,r){this.http=c,this.utilsService=r,this.retorno={}}getAddres(c,r){var O=this;return(0,h.Z)(function*(){return O.http.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${c}&lon=${r}&apiKey=e1c1fc95d3934d288f9fbadedeed9d1b`).toPromise()})()}getAddresByCEP(c){var r=this;return(0,h.Z)(function*(){return r.http.get(`https://viacep.com.br/ws/${c}/json/ `).toPromise()})()}static#e=this.\u0275fac=function(r){return new(r||g)(u.LFG(s.eN),u.LFG(m.FW))};static#n=this.\u0275prov=u.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"})}return g})()}}]);