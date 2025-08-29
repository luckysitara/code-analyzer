import React, { useState, useRef } from 'react';
import { Upload, FileCode, BarChart3, AlertCircle, CheckCircle, Loader2, Download } from 'lucide-react';

const CodeAnalyzerApp = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const zipFiles = droppedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.zip') || 
      file.type === 'application/zip'
    );
    
    if (zipFiles.length > 0) {
      setFiles(zipFiles);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const analyzeCode = async () => {
    if (files.length === 0) return;
    
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis = {
      totalFiles: Math.floor(Math.random() * 50) + 10,
      linesOfCode: Math.floor(Math.random() * 10000) + 1000,
      languages: [
        { name: 'JavaScript', percentage: 45, files: 12 },
        { name: 'Python', percentage: 30, files: 8 },
        { name: 'HTML/CSS', percentage: 15, files: 5 },
        { name: 'JSON', percentage: 10, files: 3 }
      ],
      codeQuality: {
        score: Math.floor(Math.random() * 40) + 60,
        issues: Math.floor(Math.random() * 20) + 5,
        suggestions: [
          "Consider adding more comments for better code documentation",
          "Some functions are quite long - consider breaking them into smaller pieces",
          "Missing error handling in several async functions"
        ]
      },
      security: {
        vulnerabilities: Math.floor(Math.random() * 5),
        riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      },
      complexity: {
        average: (Math.random() * 10 + 1).toFixed(1),
        highest: 'authentication.js'
      }
    };
    
    setAnalysis(mockAnalysis);
    setAnalyzing(false);
  };

  const resetAnalysis = () => {
    setFiles([]);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <FileCode className="inline-block mr-3 text-purple-400" size={40} />
            AI Code Analyzer
          </h1>
          <p className="text-slate-300 text-lg">
            Upload ZIP files to get intelligent code analysis powered by AI
          </p>
        </div>

        {/* Upload Section */}
        {!analysis && (
          <div className="max-w-2xl mx-auto">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-slate-600 hover:border-purple-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto mb-6 text-purple-400" size={64} />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Drop your ZIP file here
              </h3>
              <p className="text-slate-400 mb-6">
                Or click to browse and select your code archive
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="mt-8 bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4">Selected Files:</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-slate-300">{file.name}</span>
                    <span className="text-slate-400 text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
                <button
                  onClick={analyzeCode}
                  disabled={analyzing}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Analyzing Code...
                    </>
                  ) : (
                    <>
                      <BarChart3 size={20} />
                      Analyze Code
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
              <button
                onClick={resetAnalysis}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Analyze New File
              </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h3 className="text-purple-400 font-medium mb-2">Total Files</h3>
                <p className="text-3xl font-bold text-white">{analysis.totalFiles}</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h3 className="text-blue-400 font-medium mb-2">Lines of Code</h3>
                <p className="text-3xl font-bold text-white">{analysis.linesOfCode.toLocaleString()}</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h3 className="text-green-400 font-medium mb-2">Quality Score</h3>
                <p className="text-3xl font-bold text-white">{analysis.codeQuality.score}/100</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h3 className="text-yellow-400 font-medium mb-2">Security Risk</h3>
                <p className={`text-2xl font-bold ${
                  analysis.security.riskLevel === 'Low' ? 'text-green-400' :
                  analysis.security.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {analysis.security.riskLevel}
                </p>
              </div>
            </div>

            {/* Language Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="text-purple-400" size={24} />
                  Language Distribution
                </h3>
                <div className="space-y-4">
                  {analysis.languages.map((lang, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">{lang.name}</span>
                        <span className="text-slate-400">{lang.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${lang.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">{lang.files} files</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Quality */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <AlertCircle className="text-yellow-400" size={24} />
                  Security & Quality
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Vulnerabilities Found</span>
                    <span className={`font-bold ${
                      analysis.security.vulnerabilities === 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {analysis.security.vulnerabilities}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Code Issues</span>
                    <span className="text-yellow-400 font-bold">{analysis.codeQuality.issues}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Avg. Complexity</span>
                    <span className="text-blue-400 font-bold">{analysis.complexity.average}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Most Complex File</span>
                    <span className="text-slate-400 text-sm">{analysis.complexity.highest}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-400" size={24} />
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {analysis.codeQuality.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 mx-auto">
                <Download size={20} />
                Export Analysis Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeAnalyzerApp;
