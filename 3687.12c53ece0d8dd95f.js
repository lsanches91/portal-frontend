"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3687],{3687:(T,d,a)=>{a.r(d),a.d(d,{LoginPageModule:()=>Z});var h=a(6814),c=a(95),r=a(3582),g=a(3044),u=a(5861),n=a(6689),f=a(4414),p=a(7696),m=a(6402);function L(o,_){1&o&&(n.TgZ(0,"div",10),n._UZ(1,"img",11),n.qZA())}const v=function(){return["/esqueceu-senha"]},y=function(){return["/cadastro"]},M=[{path:"",component:(()=>{class o{constructor(e,t,i,s){this.toastController=e,this.usuarioService=t,this.authentication=i,this.router=s,this.email="",this.senha="",this.isMostrarLogo=window.innerWidth<=600}ngOnInit(){this.verificaLoginExistente()}presentToast(e){var t=this;return(0,u.Z)(function*(){yield(yield t.toastController.create({message:e,duration:1500,position:"top"})).present()})()}verificaLoginExistente(){var e=this;return(0,u.Z)(function*(){(yield e.usuarioService.getUsuarioLogado())&&e.router.navigate(["/perfil"])})()}logar(){var e=this;return(0,u.Z)(function*(){const t={email:e.email,senha:e.senha};if(yield e.authentication.login(t)){e.presentToast("Entrando...");const s=yield e.usuarioService.getUsuario();yield e.usuarioService.setUsuarioLogado(s),localStorage.setItem("recarregarPagina","true"),setTimeout(()=>{e.router.navigate(["/perfil"])},1e3)}})()}mostrarLogo(){return this.isMostrarLogo}onResize(e){this.atualizarExibicaoLogo()}atualizarExibicaoLogo(){this.isMostrarLogo=window.innerWidth<=600}static#n=this.\u0275fac=function(t){return new(t||o)(n.Y36(f.yF),n.Y36(p.i),n.Y36(m.$),n.Y36(g.F0))};static#e=this.\u0275cmp=n.Xpm({type:o,selectors:[["app-login"]],hostBindings:function(t,i){1&t&&n.NdJ("resize",function(l){return i.onResize(l)},!1,n.Jf7)},decls:18,vars:8,consts:[[3,"fullscreen"],[1,"flex-center"],["class","login-logo",4,"ngIf"],["label","Email","labelPlacement","floating","placeholder","Insira o email","type","email",3,"ngModel","keydown.enter","ngModelChange"],["name","person-outline"],["label","Senha","labelPlacement","floating","placeholder","Insira a senha","type","password",3,"ngModel","keydown.enter","ngModelChange"],["name","lock-closed-outline"],["color","dark","fill","clear",3,"routerLink"],["id","logar","color","primary","expand","block",3,"click"],["id","logar","expand","block","fill","clear",3,"routerLink"],[1,"login-logo"],[1,"img-logo"]],template:function(t,i){1&t&&(n.TgZ(0,"ion-content",0)(1,"div",1)(2,"ion-card")(3,"ion-card-content"),n.YNc(4,L,2,0,"div",2),n.TgZ(5,"ion-item")(6,"ion-input",3),n.NdJ("keydown.enter",function(){return i.logar()})("ngModelChange",function(l){return i.email=l}),n.qZA(),n._UZ(7,"ion-icon",4),n.qZA(),n.TgZ(8,"ion-item")(9,"ion-input",5),n.NdJ("keydown.enter",function(){return i.logar()})("ngModelChange",function(l){return i.senha=l}),n.qZA(),n._UZ(10,"ion-icon",6),n.qZA(),n.TgZ(11,"ion-button",7),n._uU(12,"Esqueceu a senha?"),n.qZA(),n._UZ(13,"br"),n.TgZ(14,"ion-button",8),n.NdJ("click",function(){return i.logar()}),n._uU(15,"Logar"),n.qZA(),n.TgZ(16,"ion-button",9),n._uU(17,"Registrar"),n.qZA()()()()()),2&t&&(n.Q6J("fullscreen",!0),n.xp6(4),n.Q6J("ngIf",i.mostrarLogo()),n.xp6(2),n.Q6J("ngModel",i.email),n.xp6(3),n.Q6J("ngModel",i.senha),n.xp6(2),n.Q6J("routerLink",n.DdM(6,v)),n.xp6(5),n.Q6J("routerLink",n.DdM(7,y)))},dependencies:[h.O5,c.JJ,c.On,r.YG,r.PM,r.FN,r.W2,r.gu,r.pK,r.Ie,r.j9,r.YI,g.rH],styles:[".flex-center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}ion-button[color=dark][_ngcontent-%COMP%]{text-transform:initial}ion-img[_ngcontent-%COMP%]{width:200px;height:150px}.login-logo[_ngcontent-%COMP%]{display:flex;justify-content:center}.img-logo[_ngcontent-%COMP%]{content:url(logo.13f27608b31c0989.png);width:150px;height:150px}"]})}return o})()}];let P=(()=>{class o{static#n=this.\u0275fac=function(t){return new(t||o)};static#e=this.\u0275mod=n.oAB({type:o});static#t=this.\u0275inj=n.cJS({imports:[g.Bz.forChild(M),g.Bz]})}return o})(),Z=(()=>{class o{static#n=this.\u0275fac=function(t){return new(t||o)};static#e=this.\u0275mod=n.oAB({type:o});static#t=this.\u0275inj=n.cJS({imports:[h.ez,c.u5,r.Pc,P]})}return o})()}}]);