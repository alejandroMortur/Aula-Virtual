/**
 * Class: Document
 * Description:
 * Represents a document associated with a specific task. This class encapsulates
 * the document's attributes and provides methods to retrieve and modify its properties.
 */
class Document {
    constructor(documentData) {
        this.document_id = documentData.document_id;
        this.task_id = documentData.task_id;
        this.file_path = documentData.file_path;
        this.type = documentData.type;
        this.uploaded_at = new Date(documentData.uploaded_at);  
        this.status = documentData.status;
    }

    // Getters
    getDocument_id() {
        return this.document_id;
    }
    getTask_id() {
        return this.task_id;
    }
    getFile_path() {
        return this.file_path;
    }
    getType() {
        return this.type;
    }
    getUploaded_at() {
        return this.uploaded_at;
    }
    getStatus() {
        return this.status;
    }

    // Setters
    setDocument_id(value) {
        this.document_id = value;
    }
    setTask_id(value) {
        this.task_id = value;
    }
    setFile_path(value) {
        this.file_path = value;
    }
    setType(value) {
        this.type = value;
    }
    setUploaded_at(value) {
        this.uploaded_at = new Date(value);
    }
    setStatus(value) {
        this.status = value;
    }
}
