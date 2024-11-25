#!/bin/bash

# this file is here so David can reset his local database
# without typing a million commands :D
# feel free to remove but otherwise its here so I don't forget it
# cuz its not in the source :)

echo "DROP DATABASE pangolin" | psql
echo "CREATE DATABASE pangolin" | psql
psql -d pangolin < ./pangolinDB.sql
