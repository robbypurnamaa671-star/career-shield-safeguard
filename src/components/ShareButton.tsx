import { useState } from 'react';
import { Share2, Copy, Twitter, Linkedin, Mail, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  shareContent,
  copyToClipboard,
  shareToTwitter,
  shareToLinkedIn,
  shareViaEmail,
  shareToWhatsApp,
  canNativeShare,
} from '@/lib/share';

interface ShareButtonProps {
  shareText: string;
  title?: string;
  className?: string;
  variant?: 'default' | 'icon' | 'full';
}

export const ShareButton = ({ 
  shareText, 
  title = 'Career Shield Assessment',
  className,
  variant = 'default'
}: ShareButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleNativeShare = async () => {
    await shareContent({
      title,
      text: shareText,
    });
    setShowOptions(false);
  };

  const handleCopy = async () => {
    await copyToClipboard(shareText);
    setShowOptions(false);
  };

  const handleTwitter = () => {
    shareToTwitter(shareText);
    setShowOptions(false);
  };

  const handleLinkedIn = () => {
    shareToLinkedIn(shareText);
    setShowOptions(false);
  };

  const handleEmail = () => {
    shareViaEmail(title, shareText);
    setShowOptions(false);
  };

  const handleWhatsApp = () => {
    shareToWhatsApp(shareText);
    setShowOptions(false);
  };

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={cn(
            "p-2 rounded-lg hover:bg-muted transition-colors",
            className
          )}
          aria-label="Share"
        >
          <Share2 className="w-5 h-5 text-muted-foreground" />
        </button>

        {showOptions && (
          <ShareDropdown
            onClose={() => setShowOptions(false)}
            onNativeShare={canNativeShare() ? handleNativeShare : undefined}
            onCopy={handleCopy}
            onTwitter={handleTwitter}
            onLinkedIn={handleLinkedIn}
            onEmail={handleEmail}
            onWhatsApp={handleWhatsApp}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowOptions(!showOptions)}
        variant="outline"
        className={cn("gap-2", className)}
      >
        <Share2 className="w-4 h-4" />
        {variant === 'full' && 'Share Results'}
      </Button>

      {showOptions && (
        <ShareDropdown
          onClose={() => setShowOptions(false)}
          onNativeShare={canNativeShare() ? handleNativeShare : undefined}
          onCopy={handleCopy}
          onTwitter={handleTwitter}
          onLinkedIn={handleLinkedIn}
          onEmail={handleEmail}
          onWhatsApp={handleWhatsApp}
        />
      )}
    </div>
  );
};

interface ShareDropdownProps {
  onClose: () => void;
  onNativeShare?: () => void;
  onCopy: () => void;
  onTwitter: () => void;
  onLinkedIn: () => void;
  onEmail: () => void;
  onWhatsApp: () => void;
}

const ShareDropdown = ({
  onClose,
  onNativeShare,
  onCopy,
  onTwitter,
  onLinkedIn,
  onEmail,
  onWhatsApp,
}: ShareDropdownProps) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-card rounded-xl border border-border shadow-lg animate-scale-in overflow-hidden">
        <div className="p-2">
          <div className="flex items-center justify-between px-3 py-2 mb-1">
            <span className="text-sm font-medium text-foreground">Share via</span>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {onNativeShare && (
            <button
              onClick={onNativeShare}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">Share...</span>
            </button>
          )}

          <button
            onClick={onCopy}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Copy className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-foreground">Copy to Clipboard</span>
          </button>

          <div className="h-px bg-border my-2" />

          <button
            onClick={onTwitter}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center">
              <Twitter className="w-4 h-4 text-[#1DA1F2]" />
            </div>
            <span className="text-sm text-foreground">Twitter / X</span>
          </button>

          <button
            onClick={onLinkedIn}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#0A66C2]/10 flex items-center justify-center">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            </div>
            <span className="text-sm text-foreground">LinkedIn</span>
          </button>

          <button
            onClick={onWhatsApp}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <span className="text-sm text-foreground">WhatsApp</span>
          </button>

          <button
            onClick={onEmail}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-foreground">Email</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareButton;
