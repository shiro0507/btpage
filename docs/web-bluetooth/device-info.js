function onButtonClick() {

  /*form*/
  let filters = [];

  let filterService = document.querySelector('#service').value;
  if (filterService.startsWith('0x')) {
    filterService = parseInt(filterService);
  }
  if (filterService) {
    filters.push({services: [filterService]});
  }

  let filterName = document.querySelector('#name').value;
  if (filterName) {
    filters.push({name: filterName});
  }

  let filterNamePrefix = document.querySelector('#namePrefix').value;
  if (filterNamePrefix) {
    filters.push({namePrefix: filterNamePrefix});
  }

  /*all*/
  let options = {};
  if (document.querySelector('#allDevices').checked) {
    options.acceptAllDevices = true;
    /*options.optionalServices=['0000180a-0000-1000-8000-00805f9b34fb'];
    filters.push({services: ['0000180a-0000-1000-8000-00805f9b34fb']});
    options.optionalServices = optionalServices: ['0000180a-0000-1000-8000-00805f9b34fb'];*/

  } else {
    options.filters = filters;
  }

  log('Requesting Bluetooth Device...');
  console.log('Requesting Bluetooth Device...');
  log('with ' + JSON.stringify(options));
  console.log('with ' + JSON.stringify(options));

  /*navigator.bluetooth.requestDevice(options)*/  
  navigator.bluetooth.requestDevice({acceptAllDevices:true, optionalServices:['0000180a-0000-1000-8000-00805f9b34fb']})

  .then(device => device.gatt.connect()
    /*device => {
                log('> Name:             ' + device.name);
                log('> Id:               ' + device.id);
                log('> Connected:        ' + device.gatt.connected);
                log('> uuid:             ' + device.uuids);
                log('> ad:               ' + device.adData);
                log('> productID:       ' + device.productID);
                log('> gattServer:       ' + device.gattServer);
                log('> vendorID:       ' + device.vendorID);
                log('> productID:       ' + device.productID);
                log('> vendorIDSource:  ' + device.vendorIDSource);
                }*/

    /*return device.gatt.connect()
    console.log(device.name);*/
  

    )

  .then(server => {
    log('Getting Battery Service...');
    return server.getPrimaryService('battery_service');
  })

  .catch(error => {
    log('Argh! ' + error);
    console.log('Argh! ' + error);
  });
}

function onDisconnectButtonClick() {
  if (!device) {
    return;
  }
  console.log('Disconnecting from Bluetooth Device...');
  if (device.gatt.connected) {
    device.gatt.disconnect();
  } else {
    console.log('> Bluetooth Device is already disconnected');
  }
}