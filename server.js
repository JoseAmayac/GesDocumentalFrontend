const app = express();

app.use(express.static(__dirname+'/dist/sisdocumental'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/sisdocumental/index.html'));
});

app.listen(process.env.PORT || 8080);