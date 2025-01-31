filename="backup_$(date +"%Y%m%d_%H%M%S").archive"
folder="./backups"

docker exec -it && 
if [ ! -d "$folder" ]; then
    mkdir -p "$folder"
    echo "Folder created: $folder"
else
    echo "Folder already exists: $folder"
fi
docker exec -it mongodb mongodump --uri mongodb://mongo:27017/dmcc --gzip --archive=./backups/$filename
