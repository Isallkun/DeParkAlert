// DeParkAlert Report Registry Smart Contract
// TON Blockchain - Tact Language

import "@stdlib/deploy";

// Report structure
struct Report {
    id: Int as uint32;
    hash: String;
    reporter: Address;
    timestamp: Int as uint32;
    verified: Bool;
}

// Message to submit a new report
message SubmitReport {
    hash: String;
}

// Message to verify a report (owner only)
message VerifyReport {
    id: Int as uint32;
}

// Main contract
contract ReportRegistry with Deployable {
    owner: Address;
    reportCount: Int as uint32 = 0;
    reports: map<Int, Report>;
    
    // Initialize contract with owner address
    init(owner: Address) {
        self.owner = owner;
    }
    
    // Submit a new report
    receive(msg: SubmitReport) {
        self.reportCount = self.reportCount + 1;
        
        self.reports.set(self.reportCount, Report{
            id: self.reportCount,
            hash: msg.hash,
            reporter: sender(),
            timestamp: now(),
            verified: false
        });
    }
    
    // Verify a report (owner only)
    receive(msg: VerifyReport) {
        require(sender() == self.owner, "Only owner can verify");
        
        let report: Report? = self.reports.get(msg.id);
        if (report != null) {
            let r: Report = report!!;
            r.verified = true;
            self.reports.set(msg.id, r);
        }
    }
    
    // Get a specific report
    get fun getReport(id: Int): Report? {
        return self.reports.get(id);
    }
    
    // Get total report count
    get fun getReportCount(): Int {
        return self.reportCount;
    }
    
    // Get contract owner
    get fun getOwner(): Address {
        return self.owner;
    }
}
