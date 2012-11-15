#!/bin/bash

java -jar compiler.jar --js=../src/SolariBoard.js --js_output_file=../build/SolariBoard.min.js
cp ../src/SolariBoard.css ../build/SolariBoard.css