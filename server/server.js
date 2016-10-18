process.env.MAIL_URL="smtp://evaluaalprofe%40gmail.com:asafarafam@smtp.gmail.com:25/";

//prerenderio.set('prerenderToken', '6BD92LSIy0axqaTD7yr8');
//WebApp.rawConnectHandlers.use(prerenderio);

Meteor.startup(function() {
	//const settings = Meteor.settings.PrerenderIO;
	prerenderio.set('protocol', 'http');
	//prerenderio.set('serviceUrl', 'http://service.prerender.io/');
	prerenderio.set('prerenderToken', '6BD92LSIy0axqaTD7yr8');
	//prerenderio.set('host', 'http://evaluaalprofe.cl');
	
	WebApp.rawConnectHandlers.use(prerenderio);
});