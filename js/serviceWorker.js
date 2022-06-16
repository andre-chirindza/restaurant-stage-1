class ServiceWorkerRegister{
    /** 
*  ServiceWork register
*/
    static register() {
        if (navigator.serviceWorker) {
        
        navigator.serviceWorker
            .register('/js/sw/index.js')
            .then(register => console.log('ServiceWorker Registered'))
            .catch(error => console.log(`ServiceWorker failed: ${error.message}`));
        }
  
    }
}