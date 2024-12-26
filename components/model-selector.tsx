// filepath: components/model-selector.tsx
'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'
import Image from 'next/image'
import { Model, models } from '@/lib/types/models'
import { createModelId } from '@/lib/utils'

interface ModelSelectorProps {
  selectedModelId: string | undefined
  onModelChange: (id: string) => void
}

function groupModelsByProvider(models: Model[]) {
  return models.reduce((groups, model) => {
    const provider = model.provider
    if (!groups[provider]) {
      groups[provider] = []
    }
    groups[provider].push(model)
    return groups
  }, {} as Record<string, Model[]>)
}

export function ModelSelector({
                                selectedModelId,
                                onModelChange
                              }: ModelSelectorProps) {
  const geminiDefaultId = models.find(model => model.name === 'Gemini 2.0 Flash')?.id

  // Use the provided selectedModelId or fallback to the Gemini model ID
  const currentModelId = selectedModelId || geminiDefaultId

  const handleModelChange = (id: string) => {
    onModelChange(id)
  }

  const groupedModels = groupModelsByProvider(models)
  const selectedModel = models.find(model => createModelId(model) === currentModelId)

  return (
      <div className="absolute -top-8 left-2">
        <Select
            name="model"
            value={currentModelId}
            onValueChange={handleModelChange}
        >
          <SelectTrigger
              className="flex items-center gap-1.5 h-7 pl-2 pr-3 text-xs
                     bg-muted/40 hover:bg-muted/60 rounded-full
                     border-0 shadow-none focus:ring-0
                     transition-colors"
          >
            <SelectValue>
              {selectedModel && (
                  <div className="flex items-center gap-1.5">
                    <Image
                        src={`/providers/logos/${selectedModel.providerId}.svg`}
                        alt={selectedModel.provider}
                        width={14}
                        height={14}
                        className="rounded-full bg-background/80 p-0.5"
                    />
                    <span>{selectedModel.name}</span>
                  </div>
              )}
            </SelectValue>
          </SelectTrigger>

          <SelectContent
              className="max-h-[300px] overflow-y-auto border border-border/50 bg-background/95 backdrop-blur-sm"
          >
            {Object.entries(groupedModels).map(([provider, models]) => (
                <SelectGroup key={provider}>
                  <SelectLabel
                      className="text-xs sticky top-0 bg-background/95 backdrop-blur-sm px-2 py-1.5
                          font-medium text-muted-foreground"
                  >
                    {provider}
                  </SelectLabel>
                  {models.map(model => (
                      <SelectItem
                          key={createModelId(model)}
                          value={createModelId(model)}
                          className="py-1.5 px-2 text-sm cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                              src={`/providers/logos/${model.providerId}.svg`}
                              alt={model.provider}
                              width={16}
                              height={16}
                              className="bg-background rounded-full p-0.5"
                          />
                          <span className="text-xs font-medium">{model.name}</span>
                        </div>
                      </SelectItem>
                  ))}
                </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
  )
}
