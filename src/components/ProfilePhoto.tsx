import { useState } from 'react';
import { Camera, User, Image as ImageIcon } from 'lucide-react';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ProfilePhotoProps {
  photoUrl: string | null;
  onPhotoChange: (photoUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfilePhoto = ({ photoUrl, onPhotoChange, size = 'md' }: ProfilePhotoProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-20 w-20',
    lg: 'h-28 w-28',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const takePhoto = async (source: CameraSource) => {
    setIsLoading(true);
    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source,
        width: 512,
        height: 512,
      });

      if (image.dataUrl) {
        onPhotoChange(image.dataUrl);
        toast.success('Profile photo updated!');
      }
    } catch (error: any) {
      // User cancelled or permission denied
      if (error.message?.includes('User cancelled') || error.message?.includes('canceled')) {
        return;
      }
      console.error('Camera error:', error);
      toast.error('Failed to access camera. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakePhoto = () => takePhoto(CameraSource.Camera);
  const handleChooseFromGallery = () => takePhoto(CameraSource.Photos);

  return (
    <div className="relative inline-block">
      <Avatar className={`${sizeClasses[size]} ring-2 ring-border ring-offset-2 ring-offset-background`}>
        <AvatarImage src={photoUrl || undefined} alt="Profile photo" />
        <AvatarFallback className="bg-muted">
          <User className={`${iconSizes[size]} text-muted-foreground`} />
        </AvatarFallback>
      </Avatar>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-lg"
            disabled={isLoading}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleTakePhoto} className="cursor-pointer">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleChooseFromGallery} className="cursor-pointer">
            <ImageIcon className="mr-2 h-4 w-4" />
            Choose from Gallery
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
