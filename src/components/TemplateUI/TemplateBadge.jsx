import React from 'react';
import { Star, Crown, Zap, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';

export default function TemplateBadge({ type = 'free', variant = 'default', className = '' }) {
  const badges = {
    free: {
      icon: CheckCircle,
      text: 'Gratuit',
      colors: {
        default: 'bg-green-100 text-green-700 border-green-300',
        solid: 'bg-green-500 text-white',
        outline: 'border-2 border-green-500 text-green-700 bg-white'
      }
    },
    premium: {
      icon: Crown,
      text: 'Premium',
      colors: {
        default: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-300',
        solid: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
        outline: 'border-2 border-orange-500 text-orange-700 bg-white'
      }
    },
    popular: {
      icon: Star,
      text: 'Populaire',
      colors: {
        default: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        solid: 'bg-yellow-500 text-white',
        outline: 'border-2 border-yellow-500 text-yellow-700 bg-white'
      }
    },
    new: {
      icon: Sparkles,
      text: 'Nouveau',
      colors: {
        default: 'bg-blue-100 text-blue-700 border-blue-300',
        solid: 'bg-blue-500 text-white',
        outline: 'border-2 border-blue-500 text-blue-700 bg-white'
      }
    },
    trending: {
      icon: TrendingUp,
      text: 'Tendance',
      colors: {
        default: 'bg-purple-100 text-purple-700 border-purple-300',
        solid: 'bg-purple-500 text-white',
        outline: 'border-2 border-purple-500 text-purple-700 bg-white'
      }
    },
    hot: {
      icon: Zap,
      text: 'Hot',
      colors: {
        default: 'bg-red-100 text-red-700 border-red-300',
        solid: 'bg-red-500 text-white',
        outline: 'border-2 border-red-500 text-red-700 bg-white'
      }
    }
  };

  const badgeConfig = badges[type] || badges.free;
  const Icon = badgeConfig.icon;
  const colorClass = badgeConfig.colors[variant] || badgeConfig.colors.default;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClass} ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{badgeConfig.text}</span>
    </span>
  );
}

// Composant pour afficher plusieurs badges
export function TemplateBadges({ isPremium, isPopular, isNew, isTrending, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {isPremium && <TemplateBadge type="premium" variant="solid" />}
      {isPopular && <TemplateBadge type="popular" variant="default" />}
      {isNew && <TemplateBadge type="new" variant="default" />}
      {isTrending && <TemplateBadge type="trending" variant="default" />}
      {!isPremium && <TemplateBadge type="free" variant="outline" />}
    </div>
  );
}