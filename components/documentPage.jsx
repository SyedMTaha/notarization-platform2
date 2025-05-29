"use client"

import { useState } from "react"
import { ArrowLeft, Download, Check, X, Eye, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"

// Sample user documents data
const documentsData = [
  {
    id: 1,
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    userAvatar: "JS",
    documents: {
      identification: {
        status: "pending", // pending, approved, rejected
        uploadDate: "2024-12-10",
        fileName: "john_id_document.pdf",
        fileSize: "2.4 MB",
      },
      notaryCertificate: {
        status: "approved",
        uploadDate: "2024-12-08",
        fileName: "john_notary_cert.pdf",
        fileSize: "1.8 MB",
      },
    },
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@email.com",
    userAvatar: "SJ",
    documents: {
      identification: {
        status: "approved",
        uploadDate: "2024-12-09",
        fileName: "sarah_id_document.pdf",
        fileSize: "3.1 MB",
      },
      notaryCertificate: {
        status: "rejected",
        uploadDate: "2024-12-07",
        fileName: "sarah_notary_cert.pdf",
        fileSize: "2.2 MB",
      },
    },
  },
  {
    id: 3,
    userName: "Mike Davis",
    userEmail: "mike.davis@email.com",
    userAvatar: "MD",
    documents: {
      identification: {
        status: "pending",
        uploadDate: "2024-12-11",
        fileName: "mike_id_document.pdf",
        fileSize: "1.9 MB",
      },
      notaryCertificate: {
        status: "pending",
        uploadDate: "2024-12-11",
        fileName: "mike_notary_cert.pdf",
        fileSize: "2.7 MB",
      },
    },
  },
]

const styles = {
  container: {
    padding: "24px",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    padding: "4px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 4px 0",
  },
  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  documentsGrid: {
    display: "grid",
    gap: "24px",
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },
  userHeader: {
    padding: "20px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 4px 0",
  },
  userEmail: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  documentsContainer: {
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  documentCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9fafb",
  },
  documentHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  documentTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    margin: 0,
  },
  statusBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  documentInfo: {
    marginBottom: "16px",
  },
  documentDetail: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "4px 0",
  },
  actionsContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.2s",
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  successButton: {
    backgroundColor: "#10b981",
    color: "white",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  outlineButton: {
    backgroundColor: "transparent",
    border: "1px solid #d1d5db",
    color: "#374151",
  },
}

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return { backgroundColor: "#dcfce7", color: "#166534" }
    case "rejected":
      return { backgroundColor: "#fee2e2", color: "#dc2626" }
    case "pending":
      return { backgroundColor: "#fef3c7", color: "#d97706" }
    default:
      return { backgroundColor: "#f3f4f6", color: "#374151" }
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case "approved":
      return <CheckCircle size={14} />
    case "rejected":
      return <XCircle size={14} />
    case "pending":
      return <Clock size={14} />
    default:
      return <AlertCircle size={14} />
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(documentsData)

  const handleApprove = (userId, documentType) => {
    setDocuments((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              documents: {
                ...user.documents,
                [documentType]: {
                  ...user.documents[documentType],
                  status: "approved",
                },
              },
            }
          : user,
      ),
    )
  }

  const handleReject = (userId, documentType) => {
    setDocuments((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              documents: {
                ...user.documents,
                [documentType]: {
                  ...user.documents[documentType],
                  status: "rejected",
                },
              },
            }
          : user,
      ),
    )
  }

  // Calculate stats
  const totalDocuments = documents.reduce((acc, user) => {
    return acc + Object.keys(user.documents).length
  }, 0)

  const pendingDocuments = documents.reduce((acc, user) => {
    return acc + Object.values(user.documents).filter((doc) => doc.status === "pending").length
  }, 0)

  const approvedDocuments = documents.reduce((acc, user) => {
    return acc + Object.values(user.documents).filter((doc) => doc.status === "approved").length
  }, 0)

  const rejectedDocuments = documents.reduce((acc, user) => {
    return acc + Object.values(user.documents).filter((doc) => doc.status === "rejected").length
  }, 0)

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => window.history.back()} style={styles.backButton}>
            <ArrowLeft size={23} />
           
          </button>
          <h1 style={styles.title}>Documents</h1>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={{ ...styles.statNumber, color: "#3b82f6" }}>{totalDocuments}</h3>
          <p style={styles.statLabel}>Total Documents</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={{ ...styles.statNumber, color: "#d97706" }}>{pendingDocuments}</h3>
          <p style={styles.statLabel}>Pending Review</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={{ ...styles.statNumber, color: "#10b981" }}>{approvedDocuments}</h3>
          <p style={styles.statLabel}>Approved</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={{ ...styles.statNumber, color: "#ef4444" }}>{rejectedDocuments}</h3>
          <p style={styles.statLabel}>Rejected</p>
        </div>
      </div>

      {/* Documents List */}
      <div style={styles.documentsGrid}>
        {documents.map((user) => (
          <div key={user.id} style={styles.userCard}>
            {/* User Header */}
            <div style={styles.userHeader}>
              <div style={styles.avatar}>{user.userAvatar}</div>
              <div style={styles.userInfo}>
                <h3 style={styles.userName}>{user.userName}</h3>
                <p style={styles.userEmail}>{user.userEmail}</p>
              </div>
            </div>

            {/* Documents */}
            <div style={styles.documentsContainer}>
              {Object.entries(user.documents).map(([docType, docData]) => (
                <div key={docType} style={styles.documentCard}>
                  <div style={styles.documentHeader}>
                    <h4 style={styles.documentTitle}>
                      {docType === "identification" ? "ID Document" : "Notary Certificate"}
                    </h4>
                    <div style={{ ...styles.statusBadge, ...getStatusColor(docData.status) }}>
                      {getStatusIcon(docData.status)}
                      {docData.status.charAt(0).toUpperCase() + docData.status.slice(1)}
                    </div>
                  </div>

                  <div style={styles.documentInfo}>
                    <p style={styles.documentDetail}>
                      <strong>File:</strong> {docData.fileName}
                    </p>
                    <p style={styles.documentDetail}>
                      <strong>Size:</strong> {docData.fileSize}
                    </p>
                    <p style={styles.documentDetail}>
                      <strong>Uploaded:</strong> {new Date(docData.uploadDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={styles.actionsContainer}>
                    <button style={{ ...styles.button, ...styles.outlineButton }}>
                      <Eye size={14} />
                      View
                    </button>
                    <button style={{ ...styles.button, ...styles.outlineButton }}>
                      <Download size={14} />
                      Download
                    </button>
                    {docData.status === "pending" && (
                      <>
                        <button
                          style={{ ...styles.button, ...styles.successButton }}
                          onClick={() => handleApprove(user.id, docType)}
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.dangerButton }}
                          onClick={() => handleReject(user.id, docType)}
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
