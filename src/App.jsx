import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, File, CheckCircle2, XCircle, Loader, Download, Edit, Save, X, Bot, ChevronRight, ArrowDown, UploadCloud, Cpu, Send, FileText } from 'lucide-react';

// --- FILE CONFIGURATION ---
// Base64 content has been removed for readability.
const FBDI_ZIP_BASE64 = "UEsDBBQACAAIAMFh6loAAAAAAAAAAAAAAAAXACAAUmFJbnRlcmZhY2VMaW5lc0FsbC5jc3Z1eAsAAQQAAAAABAAAAABVVA0ABzJhb2hUYW9oMmFvaO3Y32rbMBQG8PvB3kEPoJKjv5Z3l9amM7TZqJPBrkpYDQ0rybBDn3+WjlNcdFMhMxDTRyAHmxwH/MMhH71v7m7XDxWpr1vSfn+o11X7ta63lIEizfH1dPjV0U29JQIoB65WUKzYu7HZ/GAAJZ2FjacZZQykxgN3zaambXc8H477F1J1w+/z6Q/dtRXdDV0/bdMrLun4MQAY3/Cd1ptts/35OF7kW3NTP9pF7Xj29mU/DGR9fCLV6dRTpQtT2g8LNS2QfDz09t2Yu8QV6CsuCcAX96L/WYwCcn84dz1pn/d990Tarn8db+9ArndLX+vzJ7oMLPbuNsXBYhMsFghLOVjcg8Ugw7JJExabr42DJS6PLBH6zNKOlvBpsUzLJk1afL42ihaXJdLCIYRW4WhJnxbPtGzSpCXma6NoCW2QFg4htIyjpXxaItOySZOWnK+NoiVNgbRwCKFVOlrapyUzLZs0aan52ihaGjTSwuHjtPB3VKjCp6UyLZs0aen52ihaBVdIC4cQWszRMj4tnWnZpEmrmK+NomWkRFo4hNDijlbp0yoyLZs0aZn52ihapRZIC4cQWsL9CwCflsm0bNKktWQTb/ili3dTCC78i+m38Sy38S5J4uILtvEcLn08TiG4XCOv/Uae50beJU1cSzby/K2S52GdfAmuk9d+J89zJ++SJq7lOnkmxVTKT1MILtfKa7+V57mVd/m3uP4CUEsHCIovGSEbAgAA/iAAAFBLAQIUAxQACAAIAMFh6lqKLxkhGwIAAP4gAAAXABgAAAAAAAAAAAC2gQAAAABSYUludGVyZmFjZUxpbmVzQWxsLmNzdnV4CwABBAAAAAAEAAAAAFVUBQABMmFvaFBLBQYAAAAAAQABAF0AAACAAgAAAAA=";
const RECON_REPORT_CSV_BASE64 = "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";

// --- CONFIGURATION CONSTANTS ---
const FBDI_TEMPLATES = [
    "Import AutoInvoice", "Blanket Purchase Agreements", "Contract Purchase Agreements", "Purchase Orders", "Requisitions", "Supplier Addresses", "Supplier Attachments", "AP Invoices", "Supplier Contacts", "Customer Information"
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
                await new Promise(res => setTimeout(res, 2000));
                setStatuses(s => ({ ...s, ucm: status }));
            }
            for (const status of loadStatuses) {
                await new Promise(res => setTimeout(res, 4000));
                setStatuses(s => ({ ...s, load: status }));
            }
            for (const status of importStatuses) {
                await new Promise(res => setTimeout(res, 5000));
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
        await new Promise(res => setTimeout(res, 5000));
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
