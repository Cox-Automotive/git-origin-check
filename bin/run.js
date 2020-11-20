#!/usr/bin/env node

const originCheck = require('../lib/originCheck.js');

const args = process.argv.slice(2);
if(args.length !== 1) {
  console.log('Please supply origin hostname.');
  process.exit(1);
}

(async () => {
  try{
    await originCheck.check(args[0]);
  } catch(e){
    console.error(`🚨 🚨 🚨  ${e.message}  🚨 🚨 🚨`);
    process.exit(1);
  }

  process.exit(0);
})();