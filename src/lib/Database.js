const Datastore = require('nedb')
const path = require('path')
module.exports = class Database extends Datastore{
	constructor(collectionFilePath) {
		super({
			filename: path.resolve(process.cwd(),'data',collectionFilePath),
			autoload: true
		})
	}
	insert(doc) {
		return new Promise((resolve,reject) => {
			super.insert(doc,(err,newDocs) => {
				if(err) {
					reject(err)
					return
				} else {
					resolve(newDocs)
					return 
				}
			})
		})
	}
	find(query) {
		return new Promise((resolve, reject) => {
			super.find(query,(err,documents) => {
				if(err){
					reject(err)
					return
				} else {
					resolve(documents)
				}
			})
		})
	}
	remove(query) {
		return new Promise((resolve,reject) => {
			super.remove(query,{multi:true},(err,removed) => {
				if(err){
					reject(err)
					return
				} else {
					resolve(removed)
				}
			})
		})
	}
	update(query, update) {
		return new Promise((resolve, reject) => {
			super.update(query,{$set:update},{multi: true, returnUpdatedDocs:true},(err,count,updated) => {
				if(err) {
					reject(err)
					return
				} else {
					resolve({count,updated})
				}
			})
		})
	}
}