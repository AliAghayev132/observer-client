// pages/admin/AdminSettingsPage.tsx
import React, { useState } from 'react';
import {
    Settings,
    CreditCard,
    Bot,
    Globe,
    UserCheck,
    AlertTriangle,
    Save,
    RotateCcw,
    MessageSquare
} from 'lucide-react';

interface SettingItem {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    icon: React.ReactNode;
    category: string;
    critical?: boolean;
}

export const AdminSettingsPage = () => {
    const [settings, setSettings] = useState<SettingItem[]>([
        // Sistem Ayarları
        {
            id: 'site_enabled',
            title: 'Site Aktif',
            description: 'Sitenin genel erişimini kontrol eder',
            enabled: true,
            icon: <Globe className="w-5 h-5" />,
            category: 'system',
            critical: true
        },
        {
            id: 'maintenance_mode',
            title: 'Bakım Modu',
            description: 'Site bakım modunda olduğunda sadece adminler erişebilir',
            enabled: false,
            icon: <Settings className="w-5 h-5" />,
            category: 'system',
            critical: true
        },
        {
            id: 'user_registration',
            title: 'Kullanıcı Kaydı',
            description: 'Yeni kullanıcıların kayıt olmasına izin verir',
            enabled: true,
            icon: <UserCheck className="w-5 h-5" />,
            category: 'system'
        },

        // Ödeme Ayarları
        {
            id: 'stripe_enabled',
            title: 'Stripe Ödemeleri',
            description: 'Stripe ile ödeme almayı aktif/pasif yapar',
            enabled: true,
            icon: <CreditCard className="w-5 h-5" />,
            category: 'payment'
        },

        // AI Ayarları
        {
            id: 'ai_chat',
            title: 'AI Sohbet',
            description: 'Kullanıcıların AI ile sohbet etmesine izin verir',
            enabled: true,
            icon: <MessageSquare className="w-5 h-5" />,
            category: 'ai'
        }
    ]);

    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);

    const categories = [
        { id: 'system', name: 'Sistem Ayarları', icon: <Settings className="w-5 h-5" /> },
        { id: 'payment', name: 'Ödeme Ayarları', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'ai', name: 'AI Ayarları', icon: <Bot className="w-5 h-5" /> }
    ];

    const handleToggle = (settingId: string) => {
        setSettings(prev => prev.map(setting =>
            setting.id === settingId
                ? { ...setting, enabled: !setting.enabled }
                : setting
        ));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSaving(false);
        setHasChanges(false);

        // Success notification (you can replace with your notification system)
        alert('Ayarlar başarıyla kaydedildi!');
    };

    const handleReset = () => {
        // Reset to original state (you can implement actual reset logic)
        setHasChanges(false);
        alert('Ayarlar sıfırlandı!');
    };

    const getSettingsByCategory = (categoryId: string) => {
        return settings.filter(setting => setting.category === categoryId);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Settings className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Sistem Ayarları</h1>
                                <p className="text-gray-600">Uygulamanın genel ayarlarını yönetin</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleReset}
                                disabled={!hasChanges || saving}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Sıfırla
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!hasChanges || saving}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Kaydediliyor...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Kaydet
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {hasChanges && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                            <span className="text-sm text-amber-800">
                                Kaydedilmemiş değişiklikleriniz var. Değişiklikleri kaydetmeyi unutmayın.
                            </span>
                        </div>
                    )}
                </div>

                {/* Settings Categories */}
                <div className="grid gap-6">
                    {categories.map(category => {
                        const categorySettings = getSettingsByCategory(category.id);

                        return (
                            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Category Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-gray-600">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {category.name}
                                        </h2>
                                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                                            {categorySettings.length} ayar
                                        </span>
                                    </div>
                                </div>

                                {/* Category Settings */}
                                <div className="divide-y divide-gray-200">
                                    {categorySettings.map(setting => (
                                        <div key={setting.id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-start space-x-4 flex-1">
                                                    <div className={`p-2 rounded-lg ${setting.enabled
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                        }`}>
                                                        {setting.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            <h3 className="text-sm font-semibold text-gray-900">
                                                                {setting.title}
                                                            </h3>
                                                            {setting.critical && (
                                                                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                                                    Kritik
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {setting.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Toggle Switch */}
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => handleToggle(setting.id)}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${setting.enabled
                                                            ? 'bg-blue-600'
                                                            : 'bg-gray-200'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.enabled
                                                                ? 'translate-x-6'
                                                                : 'translate-x-1'
                                                                }`}
                                                        />
                                                    </button>
                                                    <span className="ml-3 text-sm font-medium text-gray-700">
                                                        {setting.enabled ? 'Aktif' : 'Pasif'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* System Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-green-800">Site Durumu</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">Çevrimiçi ve Çalışıyor</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-blue-800">API Durumu</span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">Tüm Servisler Aktif</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-purple-800">Veritabanı</span>
                            </div>
                            <p className="text-xs text-purple-600 mt-1">Bağlantı Sağlıklı</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
