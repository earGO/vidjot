if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI:"mongodb://earGO:V!DJ)Td2t2b2s3@ds157475.mlab.com:57475/vidjot-prod"
    }
} else {
    module.exports = {
        mongoURI:"mongodb://localhost/vidjot-dev"
    }
}