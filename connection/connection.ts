import { connect } from 'mongoose';

connect('mongodb://root:example@localhost:27017/?authSource=admin&readPreference=primary&ssl=false');

console.log(connect)
