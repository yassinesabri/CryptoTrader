import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Http, Request, RequestMethod, Headers } from "@angular/http";
@Component({
    selector: 'page-contactUs',
    templateUrl: 'contactUs.html'
})
export class ContactUsPage {
    http: Http;
    mailgunUrl: string;
    mailgunApiKey: string;
    subject: string;
    message: string;
    sender: string;
    constructor(http: Http, private alertCtrl: AlertController, private navCtrl: NavController) {
        this.http = http;
        this.mailgunUrl = "sandboxfef8e86829ce4cd3a203a8d55264fb3f.mailgun.org";
        this.mailgunApiKey = window.btoa("api:key-d8c97f3a720fb96f116c133dc6064a9c");
    }
    send() {
        if (this.sender.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$") && this.subject.length > 3 && this.message.length > 25) {
            var requestHeaders = new Headers();
            requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
            requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            this.http.request(new Request({
                method: RequestMethod.Post,
                url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
                body: "from=" + this.sender + "&to=ensacrm@gmail.com&subject=" + this.subject + "&text=" + this.message,
                headers: requestHeaders
            }))
                .subscribe(success => {
                    let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: "Message has been sent successfully",
                        buttons: ['OK']
                    });
                    alert.onDidDismiss(() => this.navCtrl.pop());
                    alert.present(prompt);
                    //console.log("SUCCESS -> " + JSON.stringify(success));
                }, error => {
                    let alert = this.alertCtrl.create({
                        title: 'Failed',
                        subTitle: "Message was not sent",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                    //console.log("ERROR -> " + JSON.stringify(error));
                });
        } else {
            let alert = this.alertCtrl.create({
                title: 'Invalid Inputs',
                subTitle: "Please give a valid email,subject and a message that contains at least 25 character.",
                buttons: ['OK']
            });
            alert.present(prompt);
        }
    }

}