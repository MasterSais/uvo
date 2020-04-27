/**
 * @name {unique}
 * 
 * @desc Checks list to be unique..
 */

//#example
import { template, tml } from 'uvo/template';

template(`@array : @unique`)();

template(`@array : @unique('id')`)(); // by 'id'

template(`@array : @unique($0)`)([item => item.id]); // by 'id' 

tml`@a @unique`();