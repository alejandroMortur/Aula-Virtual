class Document {
    constructor(documentData) {
        this._task_id = documentData.task_id;
        this._document_id = documentData.document_id;
        this._file_path = documentData.file_path;
        this._type = documentData.type;
        this._uploaded_at = documentData.uploaded_at;
    }

    // Getters
    getTask_id() {
        return this._task_id;
    }
    getDocument_id() {
        return this._document_id;
    }
    getFile_path() {
        return this._file_path;
    }
    getUploaded_at() {
        return this._uploaded_at;
    }

    // Setters
    setUploaded_at(value) {
        this._uploaded_at = value;
    }
}
