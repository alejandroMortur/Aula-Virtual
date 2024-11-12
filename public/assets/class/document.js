class Document {
    constructor(documentData) {
        this._document_id = documentData.document_id;
        this._task_id = documentData.task_id;
        this._file_path = documentData.file_path;
        this._type = documentData.type;
        this._uploaded_at = new Date(documentData.uploaded_at);  // Convertir a objeto Date
        this._status = documentData.status;
    }

    // Getters
    getDocument_id() {
        return this._document_id;
    }
    getTask_id() {
        return this._task_id;
    }
    getFile_path() {
        return this._file_path;
    }
    getType() {
        return this._type;
    }
    getUploaded_at() {
        return this._uploaded_at;
    }
    getStatus() {
        return this._status;
    }

    // Setters
    setDocument_id(value) {
        this._document_id = value;
    }
    setTask_id(value) {
        this._task_id = value;
    }
    setFile_path(value) {
        this._file_path = value;
    }
    setType(value) {
        this._type = value;
    }
    setUploaded_at(value) {
        this._uploaded_at = new Date(value);
    }
    setStatus(value) {
        this._status = value;
    }
}
