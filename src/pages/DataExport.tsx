import { useState, useRef } from 'react';
import { Download, FileJson, FileText, Upload, CheckCircle, AlertCircle, Database, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InsightCard } from '@/components/InsightCard';
import { getAppData } from '@/lib/storage';
import { exportToJSON, exportToPDF, importFromJSON } from '@/lib/export';
import { toast } from 'sonner';

const DataExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const appData = getAppData();

  const totalAssessments = 
    appData.jobRiskAssessments.length +
    appData.skillGapAssessments.length +
    appData.aiExposureAssessments.length +
    appData.careerPlans.length;

  const handleExportJSON = () => {
    setIsExporting(true);
    try {
      exportToJSON();
      toast.success('JSON backup downloaded successfully');
    } catch (error) {
      toast.error('Failed to export data');
    }
    setIsExporting(false);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      exportToPDF();
      toast.success('PDF report downloaded successfully');
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
    setIsExporting(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const success = await importFromJSON(file);
    if (success) {
      setImportStatus('success');
      toast.success('Data imported successfully! Refresh to see changes.');
    } else {
      setImportStatus('error');
      toast.error('Invalid backup file format');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
      localStorage.removeItem('career_shield_data');
      toast.success('All data cleared. Refresh to start fresh.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Database className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Data & Export</h1>
          <p className="text-muted-foreground text-sm">Backup and manage your assessments</p>
        </div>
      </div>

      {/* Data Summary */}
      <div className="card-elevated p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Your Data</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{appData.jobRiskAssessments.length}</p>
            <p className="text-xs text-muted-foreground">Job Risk</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{appData.skillGapAssessments.length}</p>
            <p className="text-xs text-muted-foreground">Skill Gap</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{appData.aiExposureAssessments.length}</p>
            <p className="text-xs text-muted-foreground">AI Exposure</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{appData.careerPlans.length}</p>
            <p className="text-xs text-muted-foreground">Career Plans</p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card-elevated p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg text-foreground">Export Your Data</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* PDF Export */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting || totalAssessments === 0}
            className="group p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">PDF Report</h4>
                <p className="text-xs text-muted-foreground">Formatted document</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Download a professionally formatted PDF report of all your assessments.
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </div>
          </button>

          {/* JSON Export */}
          <button
            onClick={handleExportJSON}
            disabled={isExporting || totalAssessments === 0}
            className="group p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <FileJson className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">JSON Backup</h4>
                <p className="text-xs text-muted-foreground">Raw data file</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Download your raw data for backup. Can be imported later to restore.
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
              <Download className="w-4 h-4" />
              <span>Download JSON</span>
            </div>
          </button>
        </div>

        {totalAssessments === 0 && (
          <InsightCard type="info">
            Complete some assessments first to enable data export.
          </InsightCard>
        )}
      </div>

      {/* Import Section */}
      <div className="card-elevated p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg text-foreground">Import Data</h3>
        <p className="text-sm text-muted-foreground">
          Restore your data from a previous JSON backup file.
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          onClick={handleImportClick}
          variant="outline"
          className="w-full h-12"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import from JSON Backup
        </Button>

        {importStatus === 'success' && (
          <div className="flex items-center gap-2 text-risk-low text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Data imported successfully! Refresh to see changes.</span>
          </div>
        )}

        {importStatus === 'error' && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Invalid file format. Please use a valid Career Shield backup.</span>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card-elevated border-destructive/30 p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground">
          Permanently delete all your assessment data. This action cannot be undone.
        </p>
        
        <Button
          onClick={handleClearData}
          variant="outline"
          className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete All Data
        </Button>
      </div>

      {/* Info */}
      <InsightCard type="tip" title="Data Privacy">
        All your data is stored locally on your device. Career Shield never uploads 
        or transmits your personal information. Your backups are yours to keep.
      </InsightCard>
    </div>
  );
};

export default DataExport;
