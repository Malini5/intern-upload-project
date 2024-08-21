document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('document');
    const type = document.getElementById('type').value;
    const aadhaar = document.getElementById('aadhaar').value;

    if (fileInput.files.length === 0) {
        alert('Please select a document.');
        return;
    }

    const file = fileInput.files[0];
    const user = firebase.auth().currentUser;

    if (!user) {
        alert('Please log in first.');
        return;
    }

    const storageRef = firebase.storage().ref('documents/' + user.uid + '/' + file.name);
    const uploadTask = storageRef.put(file);

    // Monitor upload progress
    uploadTask.on('state_changed', function(snapshot) {
        // Optionally handle progress updates
        console.log('Upload is ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '% done');
    }, function(error) {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
    }, function() {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // Save document metadata to Firestore
            firebase.firestore().collection('documents').add({
                userId: user.uid,
                type: type,
                aadhaar: aadhaar,
                url: downloadURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Document uploaded successfully!');
                // Optionally clear form or redirect
                document.getElementById('uploadForm').reset();
            }).catch((error) => {
                console.error('Error saving document metadata:', error);
            });
        }).catch((error) => {
            console.error('Error getting document URL:', error);
        });
    });
});
