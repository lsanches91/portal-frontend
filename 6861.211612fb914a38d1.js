"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6861],{6861:(y,d,a)=>{a.r(d),a.d(d,{RedefinirSenhaPageModule:()=>S});var f=a(6814),u=a(95),r=a(3582),l=a(3044),h=a(5861),e=a(6689),g=a(7696),p=a(6080);const m=[{path:"",component:(()=>{class n{constructor(i,t,o,s){this.usuarioService=i,this.route=t,this.utilsService=o,this.router=s,this.nova_senha="",this.confirma_senha=""}ngOnInit(){}redefinir(){var i=this;return(0,h.Z)(function*(){i.nova_senha==i.confirma_senha&&i.route.params.subscribe(function(){var t=(0,h.Z)(function*(o){if(o.token){const s=o.token,c={novaSenha:i.nova_senha,tipoRedefinicao:"N"};(yield i.usuarioService.redefinirSenha(s,c))&&(i.utilsService.presentToastSuccess("Senha redefinida com sucesso!"),i.router.navigate(["/login"]))}});return function(o){return t.apply(this,arguments)}}())})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(g.i),e.Y36(l.gz),e.Y36(p.FW),e.Y36(l.F0))};static#n=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-redefinir-senha"]],decls:12,vars:3,consts:[[3,"fullscreen"],[1,"flex-center"],["label","Nova Senha","labelPlacement","floating","placeholder","Insira a nova senha","type","password",3,"ngModel","ngModelChange"],["name","lock-closed-outline"],["label","Confirma Senha","labelPlacement","floating","placeholder","Insira a confirma\xe7\xe3o de senha","type","password",3,"ngModel","keydown.enter","ngModelChange"],["id","redefinir","color","success","expand","block",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-content",0)(1,"div",1)(2,"ion-card")(3,"ion-card-content")(4,"ion-item")(5,"ion-input",2),e.NdJ("ngModelChange",function(c){return o.nova_senha=c}),e.qZA(),e._UZ(6,"ion-icon",3),e.qZA(),e.TgZ(7,"ion-item")(8,"ion-input",4),e.NdJ("keydown.enter",function(){return o.redefinir()})("ngModelChange",function(c){return o.confirma_senha=c}),e.qZA(),e._UZ(9,"ion-icon",3),e.qZA(),e.TgZ(10,"ion-button",5),e.NdJ("click",function(){return o.redefinir()}),e._uU(11,"Redefinir Senha"),e.qZA()()()()()),2&t&&(e.Q6J("fullscreen",!0),e.xp6(5),e.Q6J("ngModel",o.nova_senha),e.xp6(3),e.Q6J("ngModel",o.confirma_senha))},dependencies:[u.JJ,u.On,r.YG,r.PM,r.FN,r.W2,r.gu,r.pK,r.Ie,r.j9],styles:[".flex-center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}ion-button[color=dark][_ngcontent-%COMP%]{text-transform:initial}"]})}return n})()}];let v=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#n=this.\u0275mod=e.oAB({type:n});static#i=this.\u0275inj=e.cJS({imports:[l.Bz.forChild(m),l.Bz]})}return n})(),S=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#n=this.\u0275mod=e.oAB({type:n});static#i=this.\u0275inj=e.cJS({imports:[f.ez,u.u5,r.Pc,v]})}return n})()}}]);