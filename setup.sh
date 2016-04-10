echo installing dependencies
pip install -U textblob
python -m textblob.download_corpora
npm install
npm install -g gulp
echo dependencies successfully installed!

echo processing data
python process_data.py
echo data successfully processed!

echo starting visualization
gulp
