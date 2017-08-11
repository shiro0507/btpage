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
  } else {
    options.filters = filters;
  }

  log('Requesting Bluetooth Device...');
  log('with ' + JSON.stringify(options));
  navigator.bluetooth.requestDevice(options)
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
  .then(service => {
  // Getting Battery Level Characteristic...
  return service.getCharacteristic('battery_level');

  })


  .then(characteristic => {
  // Reading Battery Level...
  return characteristic.readValue();
  })

  .then(value => {
  console.log('Battery percentage is ' + value.getUint8(0));
  })

  .catch(error => {
    log('Argh! ' + error);
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