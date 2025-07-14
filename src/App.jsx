import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, File, CheckCircle2, XCircle, Loader, Download, Edit, Save, X, Bot, ChevronRight, ArrowDown, UploadCloud, Cpu, Send, FileText } from 'lucide-react';

// --- FILE CONFIGURATION ---
// Base64 content has been removed for readability.
const FBDI_ZIP_BASE64 = "UEsDBBQACAAIAMFh6loAAAAAAAAAAAAAAAAXACAAUmFJbnRlcmZhY2VMaW5lc0FsbC5jc3Z1eAsAAQQAAAAABAAAAABVVA0ABzJhb2hUYW9oMmFvaO3Y32rbMBQG8PvB3kEPoJKjv5Z3l9amM7TZqJPBrkpYDQ0rybBDn3+WjlNcdFMhMxDTRyAHmxwH/MMhH71v7m7XDxWpr1vSfn+o11X7ta63lIEizfH1dPjV0U29JQIoB65WUKzYu7HZ/GAAJZ2FjacZZQykxgN3zaambXc8H477F1J1w+/z6Q/dtRXdDV0/bdMrLun4MQAY3/Cd1ptts/35OF7kW3NTP9pF7Xj29mU/DGR9fCLV6dRTpQtT2g8LNS2QfDz09t2Yu8QV6CsuCcAX96L/WYwCcn84dz1pn/d990Tarn8db+9ArndLX+vzJ7oMLPbuNsXBYhMsFghLOVjcg8Ugw7JJExabr42DJS6PLBH6zNKOlvBpsUzLJk1afL42ihaXJdLCIYRW4WhJnxbPtGzSpCXma6NoCW2QFg4htIyjpXxaItOySZOWnK+NoiVNgbRwCKFVOlrapyUzLZs0aan52ihaGjTSwuHjtPB3VKjCp6UyLZs0aen52ihaBVdIC4cQWszRMj4tnWnZpEmrmK+NomWkRFo4hNDijlbp0yoyLZs0aZn52ihapRZIC4cQWsL9CwCflsm0bNKktWQTb/ili3dTCC78i+m38Sy38S5J4uILtvEcLn08TiG4XCOv/Uae50beJU1cSzby/K2S52GdfAmuk9d+J89zJ++SJq7lOnkmxVTKT1MILtfKa7+V57mVd/m3uP4CUEsHCIovGSEbAgAA/iAAAFBLAQIUAxQACAAIAMFh6lqKLxkhGwIAAP4gAAAXABgAAAAAAAAAAAC2gQAAAABSYUludGVyZmFjZUxpbmVzQWxsLmNzdnV4CwABBAAAAAAEAAAAAFVUBQABMmFvaFBLBQYAAAAAAQABAF0AAACAAgAAAAA=";
const RECON_REPORT_CSV_BASE64 = "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";

// --- CONFIGURATION CONSTANTS ---
const FBDI_TEMPLATES = [
    "Import Receivables Invoices", "Blanket Purchase Agreements", "Contract Purchase Agreements", "Purchase Orders", "Requisitions", "Supplier Addresses", "Supplier Attachments", "AP Invoices", "Supplier Contacts", "Customer Information"
];

const PROJECTS = [
    "Beacon – Cash Management Implementation", "Catalyst – Accounts Receivable Implementation", "Edge – Shared Service Finance Implementation", "Nucleus – SCM Implementation", "Splice – Manufacturing Integration"
];

const INSTANCES = ["Dev", "FP1", "FP2", "UAT", "PROD"];

const SOURCE_COLUMNS = [
    { id: 'sc-1', name: 'Business Unit' }, { id: 'sc-2', name: 'Transaction Source' }, { id: 'sc-3', name: 'Transaction Type' }, { id: 'sc-4', name: 'Transaction Date' }, { id: 'sc-5', name: 'Accounting Date' }, { id: 'sc-6', name: 'Transaction Number' }, { id: 'sc-7', name: 'Original System Bill-to Customer Reference' }, { id: 'sc-8', name: 'Original System Bill-to Customer Site Reference' }, { id: 'sc-9', name: 'Transaction Currency' }, { id: 'sc-10', name: 'Currency Conversion Type' }, { id: 'sc-11', name: 'Currency Conversion Date' }, { id: 'sc-12', name: 'Currency Conversion Rate' }, { id: 'sc-13', name: 'Invoice Lines/Description' }, { id: 'sc-14', name: 'Invoice Lines/Quantity' }, { id: 'sc-15', name: 'Invoice Lines/Unit Selling Price' }, { id: 'sc-16', name: 'Invoice Lines/Sales Order' }, { id: 'sc-17', name: 'Invoice Lines/Sales Order Date' }, { id: 'sc-18', name: 'Invoice Lines/Tax Classification Code' }, { id: 'sc-19', name: 'Payment Terms' },
];

const TARGET_COLUMNS = [
    { id: 'tc-1', name: 'BUSINESS_UNIT' }, { id: 'tc-2', name: 'BATCH_SOURCE_NAME' }, { id: 'tc-3', name: 'CUST_TRX_TYPE_NAME' }, { id: 'tc-4', name: 'TRX_DATE' }, { id: 'tc-5', name: 'GL_DATE' }, { id: 'tc-6', name: 'TRX_NUMBER' }, { id: 'tc-7', name: 'ORIG_SYSTEM_BILL_CUSTOMER_REF' }, { id: 'tc-8', name: 'ORIG_SYSTEM_BILL_ADDRESS_REF' }, { id: 'tc-9', name: 'INVOICE_CURRENCY_CODE' }, { id: 'tc-10', name: 'CONVERSION_TYPE' }, { id: 'tc-11', name: 'CONVERSION_DATE' }, { id: 'tc-12', name: 'CONVERSION_RATE' }, { id: 'tc-13', name: 'DESCRIPTION' }, { id: 'tc-14', name: 'QUANTITY' }, { id: 'tc-15', name: 'UNIT_SELLING_PRICE' }, { id: 'tc-16', name: 'SALES_ORDER' }, { id: 'tc-17', name: 'SALES_ORDER_DATE' }, { id: 'tc-18', name: 'TAX_CLASSIFICATION_CODE' }, { id: 'tc-19', name: 'TERM_NAME' }, { id: 'tc-20', name: 'INTERFACE_LINE_CONTEXT' }, { id: 'tc-21', name: 'LINE_TYPE' },
];

const INITIAL_MAPPINGS = [
    { start: 'sc-1', end: 'tc-1' }, { start: 'sc-2', end: 'tc-2' }, { start: 'sc-3', end: 'tc-3' }, { start: 'sc-4', end: 'tc-4' }, { start: 'sc-5', end: 'tc-5' }, { start: 'sc-6', end: 'tc-6' }, { start: 'sc-7', end: 'tc-7' }, { start: 'sc-8', end: 'tc-8' }, { start: 'sc-9', end: 'tc-9' }, { start: 'sc-10', end: 'tc-10' }, { start: 'sc-11', end: 'tc-11' }, { start: 'sc-12', end: 'tc-12' }, { start: 'sc-13', end: 'tc-13' }, { start: 'sc-14', end: 'tc-14' }, { start: 'sc-15', end: 'tc-15' }, { start: 'sc-16', end: 'tc-16' }, { start: 'sc-17', end: 'tc-17' }, { start: 'sc-18', end: 'tc-18' }, { start: 'sc-19', end: 'tc-19' },
];

// --- HELPER COMPONENTS ---

const Header = ({ onLogoClick }) => (
    <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-50">
        <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={onLogoClick}
        >
            <Bot className="w-8 h-8 text-[#40c1ac]" />
            <h1 className="text-2xl font-bold text-slate-800">Transfor<span className="text-[#40c1ac]">Mate</span></h1>
        </div>
        {/* The user did not provide the Calfus logo, so it's commented out. */}
        <img src="/calfus-logo.svg" alt="Calfus Logo" className="h-8 object-contain" />
    </header>
);

const CustomSelect = ({ label, value, onChange, options, placeholder }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#40c1ac] focus:border-[#40c1ac] transition"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const PrimaryButton = ({ children, onClick, disabled = false, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 bg-[#40c1ac] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#2dc4b3] transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-500 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40c1ac] ${className}`}
    >
        {children}
    </button>
);

const SecondaryButton = ({ children, onClick, disabled = false, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 bg-white text-black font-bold py-3 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 transition-all duration-300 disabled:bg-slate-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40c1ac] ${className}`}
    >
        {children}
    </button>
);

const AILoader = ({ text }) => (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
        <Bot className="w-16 h-16 text-[#40c1ac] animate-[spin_3s_linear_infinite]" />
        <p className="text-lg font-medium text-black">{text}</p>
        <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#40c1ac] rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
    </div>
);

const MappingColumn = ({ title, items, isSource = false, connectDrag, connectDrop }) => (
    <div className="w-full md:w-[48%] lg:w-[45%]">
        <h3 className="text-lg font-semibold text-black mb-4 text-center">{title}</h3>
        <div className="space-y-3">
            {items.map(item => (
                <div
                    key={item.id}
                    id={item.id}
                    className="relative bg-white border border-slate-200 rounded-lg p-3 text-center text-black shadow-sm cursor-pointer text-sm"
                    onDragOver={e => e.preventDefault()}
                    onDragStart={isSource ? e => connectDrag(e, item.id) : undefined}
                    onDrop={!isSource ? e => connectDrop(e, item.id) : undefined}
                    draggable={isSource}
                >
                    {item.name}
                </div>
            ))}
        </div>
    </div>
);

const MappingLines = ({ mappings, isEditing, containerRef }) => {
    const [lines, setLines] = useState([]);

    const calculateLines = useCallback(() => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newLines = mappings.map(({ start, end }) => {
            const startEl = document.getElementById(start);
            const endEl = document.getElementById(end);

            if (startEl && endEl) {
                const startRect = startEl.getBoundingClientRect();
                const endRect = endEl.getBoundingClientRect();

                const x1 = startRect.right - containerRect.left;
                const y1 = startRect.top + startRect.height / 2 - containerRect.top;
                const x2 = endRect.left - containerRect.left;
                const y2 = endRect.top + endRect.height / 2 - containerRect.top;
                
                const controlX1 = x1 + (x2 - x1) * 0.5;
                const controlY1 = y1;
                const controlX2 = x1 + (x2 - x1) * 0.5;
                const controlY2 = y2;
                
                const path = `M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`;

                return { id: `${start}-${end}`, path };
            }
            return null;
        }).filter(Boolean);

        setLines(newLines);
    }, [mappings, containerRef]);

    useEffect(() => {
        calculateLines();
        const scrollableParent = containerRef.current?.closest('.overflow-auto');
        if(scrollableParent) {
             scrollableParent.addEventListener('scroll', calculateLines);
        }
        window.addEventListener('resize', calculateLines);

        return () => {
            if(scrollableParent) {
                scrollableParent.removeEventListener('scroll', calculateLines);
            }
            window.removeEventListener('resize', calculateLines);
        };
    }, [calculateLines]);

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
            {lines.map(line => (
                <path
                    key={line.id}
                    d={line.path}
                    stroke={isEditing ? 'rgba(239, 68, 68, 0.8)' : '#40c1ac'}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={isEditing ? '5 5' : 'none'}
                >
                    {isEditing && <animate attributeName="stroke-dashoffset" values="10;0" dur="0.5s" repeatCount="indefinite" />}
                </path>
            ))}
        </svg>
    );
};


// --- SCREEN COMPONENTS ---

const HomeScreen = ({ setScreen }) => {
    const processSteps = [
        { icon: <UploadCloud className="w-10 h-10 text-[#40c1ac]"/>, title: "Upload Data", description: "Start by uploading your raw data file in CSV or Excel format." },
        { icon: <Cpu className="w-10 h-10 text-[#40c1ac]"/>, title: "AI-Powered Mapping", description: "Our AI intelligently suggests mappings between your source and Oracle FBDI target columns." },
        { icon: <Send className="w-10 h-10 text-[#40c1ac]"/>, title: "Automated Import", description: "TransforMate handles the complex process of loading your data into Oracle Fusion." },
        { icon: <FileText className="w-10 h-10 text-[#40c1ac]"/>, title: "Reconciliation", description: "Generate a detailed reconciliation report to verify the import process was successful." },
    ];

    return (
        <div className="max-w-5xl mx-auto p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Automate Your Oracle FBDI Data Imports</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10">
                TransforMate uses AI to streamline the entire File-Based Data Import (FBDI) process, from data mapping to final reconciliation, saving you time and reducing errors.
            </p>
            <PrimaryButton onClick={() => setScreen('upload')} className="inline-flex px-6 py-3">
                Get Started <ChevronRight />
            </PrimaryButton>

            <div className="mt-20 pt-16 border-t border-slate-200">
                <h3 className="text-3xl font-bold text-slate-900 mb-12">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {processSteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-slate-100">
                            <div className="mb-4 bg-teal-50 p-4 rounded-full">
                                {step.icon}
                            </div>
                            <h4 className="text-xl font-semibold text-slate-800 mb-2">{step.title}</h4>
                            <p className="text-slate-500 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const UploadScreen = ({ setConfig, setScreen }) => {
    const [file, setFile] = useState(null);
    const [fbdi, setFbdi] = useState("");
    const [project, setProject] = useState("");
    const [instance, setInstance] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const isDemoReady = fbdi === "Import AutoInvoice" && project === "Catalyst – Accounts Receivable Implementation" && instance === "FP1";

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragEvents = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleSubmit = () => {
        if (!file) {
             setError('Please upload a file to proceed.');
             return;
        }
        if (!isDemoReady) {
            setError('This demo is configured only for: "Import AutoInvoice", "Catalyst - Accounts Receivable Implementation", and "FP1". Please select these options to proceed.');
            return;
        }
        setError('');
        setConfig({ file, fbdi, project, instance });
        setScreen('mapping-loading');
    };

    const isFormComplete = fbdi && project && instance;

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-slate-100">
                <h2 className="text-2xl font-bold text-black text-center mb-2">Upload Your Data File</h2>
                <p className="text-center text-slate-500 mb-8">Begin the transformation by providing your raw data and configuration.</p>

                <div className="space-y-6">
                    <div
                        onDrop={handleDrop}
                        onDragEnter={handleDragEvents}
                        onDragOver={handleDragEvents}
                        onDragLeave={handleDragEvents}
                        className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-[#40c1ac] bg-teal-50' : 'border-slate-300 bg-slate-50 hover:border-[#40c1ac]'}`}
                    >
                        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".csv,.xlsx,.xls" />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <ArrowUp className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                            {file ? (
                                <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                                    <File className="w-5 h-5" />
                                    <span>{file.name}</span>
                                </div>
                            ) : (
                                <>
                                    <p className="font-semibold text-black">Click to upload or drag and drop</p>
                                    <p className="text-sm text-slate-500">CSV or Excel file</p>
                                </>
                            )}
                        </label>
                    </div>

                    <CustomSelect label="FBDI Template" value={fbdi} onChange={setFbdi} options={FBDI_TEMPLATES} placeholder="Select a template..." />
                    <CustomSelect label="Project Name" value={project} onChange={setProject} options={PROJECTS} placeholder="Select a project..." />
                    <CustomSelect label="Target Instance" value={instance} onChange={setInstance} options={INSTANCES} placeholder="Select an instance..." />
                </div>

                {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                <div className="mt-8">
                    <PrimaryButton onClick={handleSubmit} disabled={!isFormComplete}>
                        Generate FBDI Mapping <ChevronRight />
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

const MappingScreen = ({ setScreen }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [mappings, setMappings] = useState(INITIAL_MAPPINGS);
    const [draftMappings, setDraftMappings] = useState(INITIAL_MAPPINGS);
    const [draggedItem, setDraggedItem] = useState(null);
    const mappingContainerRef = useRef(null);

    const handleEdit = () => {
        setDraftMappings([...mappings]);
        setIsEditing(true);
    };

    const handleSave = () => {
        setMappings([...draftMappings]);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraftMappings([...mappings]);
        setIsEditing(false);
    };

    const handleImport = () => {
        const link = document.createElement('a');
        link.href = `data:application/zip;base64,${FBDI_ZIP_BASE64}`;
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:.]/g, '').replace('T', '_').slice(0, 15);
        link.download = `Customer_Invoice_Generated_FBDI_${timestamp}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setScreen('importing');
    };

    const connectDrag = (e, id) => {
        setDraggedItem(id);
    };

    const connectDrop = (e, id) => {
        if (draggedItem && isEditing) {
            const newMappings = draftMappings.filter(m => m.start !== draggedItem);
            setDraftMappings([...newMappings, { start: draggedItem, end: id }]);
            setDraggedItem(null);
        }
    };

    const currentMappings = isEditing ? draftMappings : mappings;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl border border-slate-100">
                <h2 className="text-2xl font-bold text-black text-center mb-2">AI Suggested Mappings</h2>
                <p className="text-center text-slate-500 mb-8">
                    Our AI has analyzed your file and suggested the following column mappings.
                </p>
                <div ref={mappingContainerRef} className="relative">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                        <MappingColumn title="Source Columns (Your File)" items={SOURCE_COLUMNS} isSource={isEditing} connectDrag={connectDrag} />
                        <MappingColumn title="Target Columns (Oracle FBDI)" items={TARGET_COLUMNS} connectDrop={connectDrop} />
                    </div>
                    <MappingLines mappings={currentMappings} isEditing={isEditing} containerRef={mappingContainerRef} />
                </div>

                <div className="flex justify-center gap-4 mt-12 border-t border-slate-200 pt-8">
                    {isEditing ? (
                        <>
                            <SecondaryButton onClick={handleCancel} className="w-auto px-6">
                                <X className="w-5 h-5" /> Cancel
                            </SecondaryButton>
                            <PrimaryButton onClick={handleSave} className="w-auto px-6">
                                <Save className="w-5 h-5" /> Save Changes
                            </PrimaryButton>
                        </>
                    ) : (
                        <>
                            <SecondaryButton onClick={handleEdit} className="w-auto px-6">
                                <Edit className="w-5 h-5" /> Edit Mappings
                            </SecondaryButton>
                            <PrimaryButton onClick={handleImport} className="w-auto px-6">
                                Import Data <ChevronRight />
                            </PrimaryButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatusCard = ({ title, status, icon }) => {
    const statusColors = {
        Succeeded: 'text-green-500 bg-green-50 border-green-200',
        Running: 'text-blue-500 bg-blue-50 border-blue-200',
        Ready: 'text-amber-500 bg-amber-50 border-amber-200',
        Waiting: 'text-slate-500 bg-slate-50 border-slate-200',
        Pending: 'text-slate-400 bg-slate-50 border-slate-200'
    };
    const colorClass = statusColors[status] || statusColors['Pending'];

    return (
        <div className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-500 ${colorClass}`}>
            <div className="flex items-center gap-3">
                {icon}
                <p className="font-semibold text-black">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                {status !== 'Succeeded' && status !== 'Pending' && <Loader className="w-4 h-4 animate-spin" />}
                <span className="font-bold">{status}</span>
            </div>
        </div>
    );
};

const ImportStatusScreen = ({ setScreen }) => {
    const [statuses, setStatuses] = useState({
        ucm: 'Pending',
        load: 'Pending',
        import: 'Pending',
    });
    const [reportStatus, setReportStatus] = useState('Disabled');

    const ucmStatuses = ['Ready', 'Running', 'Succeeded'];
    const loadStatuses = ['Waiting', 'Ready', 'Running', 'Succeeded'];
    const importStatuses = ['Blocked', 'Ready', 'Running', 'Completed', 'Succeeded'];

    useEffect(() => {
        const runSimulation = async () => {
            for (const status of ucmStatuses) {
                await new Promise(res => setTimeout(res, 5000));
                setStatuses(s => ({ ...s, ucm: status }));
            }
            for (const status of loadStatuses) {
                await new Promise(res => setTimeout(res, 7000));
                setStatuses(s => ({ ...s, load: status }));
            }
            for (const status of importStatuses) {
                await new Promise(res => setTimeout(res, 12000));
                setStatuses(s => ({ ...s, import: status }));
            }
            setReportStatus('Enabled');
        };
        runSimulation();
    }, []);

    const handleGenerateReport = async () => {
        if (reportStatus === 'Completed') {
            setScreen('home');
            return;
        }

        setReportStatus('Generating...');
        await new Promise(res => setTimeout(res, 4000));
        setReportStatus('Getting custom Report from Fusion');
        await new Promise(res => setTimeout(res, 5500));
        setReportStatus('Generating Reconciliation Report');
        await new Promise(res => setTimeout(res, 6500));
        setReportStatus('Reconciliation Report Generated');
        
        const now = new Date();
        const link = document.createElement('a');
        link.href = `data:text/csv;base64,${RECON_REPORT_CSV_BASE64}`;
        const timestamp = now.toISOString().replace(/[-:.]/g, '').replace('T', '_').slice(0, 15);
        link.download = `Reconciliation_Report_${timestamp}.csv`;
        link.download = `Import_AutoInvoice_Recon_Report_${timestamp}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        await new Promise(res => setTimeout(res, 500));
        setReportStatus('Completed');
    };

    const allSucceeded = statuses.ucm === 'Succeeded' && statuses.load === 'Succeeded' && statuses.import === 'Succeeded';

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-slate-100">
                <h2 className="text-2xl font-bold text-black text-center mb-2">Data Import in Progress</h2>
                <p className="text-center text-slate-500 mb-8">Your data is being processed by Oracle Fusion. Please wait.</p>
                <div className="space-y-4">
                    <StatusCard title="Load ZIP to UCM" status={statuses.ucm} icon={<CheckCircle2 className={`w-6 h-6 transition-colors ${statuses.ucm === 'Succeeded' ? 'text-green-500' : 'text-slate-400'}`} />} />
                    <StatusCard title="Load Interface File for Import" status={statuses.load} icon={<CheckCircle2 className={`w-6 h-6 transition-colors ${statuses.load === 'Succeeded' ? 'text-green-500' : 'text-slate-400'}`} />} />
                    <StatusCard title="Import AutoInvoice" status={statuses.import} icon={<CheckCircle2 className={`w-6 h-6 transition-colors ${statuses.import === 'Succeeded' ? 'text-green-500' : 'text-slate-400'}`} />} />
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6 text-center">
                    {allSucceeded && reportStatus !== 'Completed' && (
                        <div className="mb-4 text-black font-medium">{reportStatus === 'Enabled' ? 'All processes succeeded. You can now generate the report.' : reportStatus}</div>
                    )}
                    {reportStatus === 'Completed' && (
                        <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-lg p-4 bg-green-50 rounded-lg">
                            <CheckCircle2 />
                            <span>Process Complete! Report downloaded.</span>
                        </div>
                    )}
                    <PrimaryButton onClick={handleGenerateReport} disabled={!allSucceeded && reportStatus !== 'Completed'}>
                        {reportStatus === 'Completed' ? 'Done' : 'Generate Reconciliation Report'}
                        {reportStatus === 'Enabled' ? <Download className="w-5 h-5" /> : (reportStatus !== 'Completed' && <Loader className={`w-5 h-5 ${reportStatus !== 'Enabled' ? 'animate-spin' : 'hidden'}`} />)}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};


export default function App() {
    const [screen, setScreen] = useState('home'); // 'home', 'upload', 'mapping-loading', 'mapping', 'importing'
    const [config, setConfig] = useState(null);

    useEffect(() => {
        if (screen === 'mapping-loading') {
            const timer = setTimeout(() => {
                setScreen('mapping');
            }, 8500); // Simulate AI thinking time
            return () => clearTimeout(timer);
        }
    }, [screen]);

    const renderScreen = () => {
        switch (screen) {
            case 'home':
                return <HomeScreen setScreen={setScreen} />;
            case 'upload':
                return <UploadScreen setConfig={setConfig} setScreen={setScreen} />;
            case 'mapping-loading':
                return <AILoader text="Analyzing columns and generating mappings..." />;
            case 'mapping':
                return <MappingScreen setScreen={setScreen} />;
            case 'importing':
                return <ImportStatusScreen setScreen={setScreen} />;
            default:
                return <HomeScreen setScreen={setScreen} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <style>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
            <Header onLogoClick={() => setScreen('home')} />
            <main className="py-10">
                {renderScreen()}
            </main>
        </div>
    );
}
